// Sample messages for testing
var sampleMessages = [
    { text: 'Congratulations to all the graduates!', signature: 'Proud Alumni', approved: true },
    { text: 'The future is bright, keep pushing forward!', signature: 'Your Mentor', approved: true },
    { text: 'Remember, the journey has just begun.', signature: 'Class of 2024', approved: false },
    { text: 'Wishing you all the success in your future endeavors!', signature: 'Anonym', approved: false }
];

// Store sample messages in local storage if not already present
if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify(sampleMessages));
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var messageText = document.getElementById('message').value;
    var signatureText = document.getElementById('signature').value;
    
    var newMessage = {
        text: messageText,
        signature: signatureText,
        approved: false
    };
    
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    alert('Message submitted for review');
    
    // Clear the form
    document.getElementById('message').value = '';
    document.getElementById('signature').value = '';
});

function loadMessages() {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
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
}

function loadReviewMessages() {
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
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
            localStorage.setItem('messages', JSON.stringify(messages));
            loadReviewMessages();
            loadMessages();
        };
        newMessage.appendChild(approveButton);
        
        reviewList.appendChild(newMessage);
    });
}

if (document.getElementById('messageList')) {
    loadMessages();
}

if (document.getElementById('reviewList')) {
    loadReviewMessages();
}
