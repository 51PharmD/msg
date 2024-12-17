document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var messageText = document.getElementById('message').value;
    var signatureText = document.getElementById('signature').value;
    
    // Simulate sending the message to your email (this is a placeholder)
    alert('Message submitted for review: ' + messageText + (signatureText ? ' - ' + signatureText : ''));
    
    // Clear the form
    document.getElementById('message').value = '';
    document.getElementById('signature').value = '';
    
    // Add message to the list manually (you will do this step after reviewing the message)
    var messageList = document.getElementById('messageList');
    var newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = messageText;
    if (signatureText) {
        var signatureDiv = document.createElement('div');
        signatureDiv.className = 'signature';
        signatureDiv.innerText = ' - ' + signatureText;
        newMessage.appendChild(signatureDiv);
    }
    messageList.appendChild(newMessage);
});

// For testing, add two random messages
var testMessages = [
    { text: 'Congratulations to all the graduates!', signature: 'Proud Alumni' },
    { text: 'The future is bright, keep pushing forward!', signature: 'Your Mentor' }
];

testMessages.forEach(function(msg) {
    var messageList = document.getElementById('messageList');
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
