const backendUrl = 'https://raw.githubusercontent.com/yourusername/anonymous-messages/main/messages.json'; // Replace with your actual GitHub repo URL

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var messageText = document.getElementById('message').value;
    var signatureText = document.getElementById('signature').value;
    
    var newMessage = {
        text: messageText,
        signature: signatureText,
        approved: false
    };

    fetch(backendUrl)
        .then(response => response.json())
        .then(messages => {
            messages.push(newMessage);
            return fetch(backendUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messages)
            });
        })
        .then(response => {
            if (response.ok) {
                alert('Message submitted for review');
                document.getElementById('message').value = '';
                document.getElementById('signature').value = '';
                loadMessages();
            } else {
                alert('Failed to submit message');
            }
        });
});

function loadMessages() {
    fetch(backendUrl)
        .then(response => response.json())
        .then(messages => {
            var messageList = document.getElementById('messageList');
            messageList.innerHTML = '';
            messages.filter(msg => msg.approved).forEach(function(msg) {
                var newMessage = document.createElement('div');
                newMessage.className = 'message';
                newMessage.innerHTML = msg.text;
                if (msg.signature) {
                    var signatureDiv = document.createElement('div');
                    signatureDiv.className = 'signature';
                    signatureDiv.innerText = ' - ' + msg.signature;
                    newMessage.appendChild(signatureDiv);
                }
                messageList.appendChild(newMessage);
            });
        });
}

function loadReviewMessages() {
    fetch(backendUrl)
        .then(response => response.json())
        .then(messages => {
            var reviewList = document.getElementById('reviewList');
            reviewList.innerHTML = '';
            messages.filter(msg => !msg.approved).forEach(function(msg) {
                var newMessage = document.createElement('div');
                newMessage.className = 'message';
                newMessage.innerHTML = msg.text;
                if (msg.signature) {
                    var signatureDiv = document.createElement('div');
                    signatureDiv.className = 'signature';
                    signatureDiv.innerText = ' - ' + msg.signature;
                    newMessage.appendChild(signatureDiv);
                }

                var approveButton = document.createElement('button');
                approveButton.className = 'approve';
                approveButton.innerText = 'Approve';
                approveButton.onclick = function() {
                    msg.approved = true;
                    fetch(backendUrl)
                        .then(response => response.json())
                        .then(messages => {
                            const index = messages.findIndex(m => m.text === msg.text && m.signature === msg.signature);
                            if (index !== -1) {
                                messages[index] = msg;
                                return fetch(backendUrl, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(messages)
                                });
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                loadReviewMessages();
                                loadMessages();
                            } else {
                                alert('Failed to approve message');
                            }
                        });
                };
                newMessage.appendChild(approveButton);
                reviewList.appendChild(newMessage);
            });
        });
}

if (document.getElementById('messageList')) {
    loadMessages();
}

if (document.getElementById('reviewList')) {
    loadReviewMessages();
}
