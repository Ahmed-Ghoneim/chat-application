// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Send message.
btn.addEventListener('click', function(){

  if( (handle.value != '') && (message.value != '') ){
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = '';
  }
});

// send that the user is Typing..
message.addEventListener('change', function () {
  if(message.value != ''){
    socket.emit('typing', handle.value);
  }
  socket.emit('notTyping', handle.value);
});

// recieve messages
socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML +='<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

// show that the user is Typing..
socket.on('typing', function (data) {
  feedback.innerHTML = '<p id=' + data + '><em>' + data + ' is typing....</em></p>';
});

// if the user cleared the message field clear the typing...
socket.on('notTyping', function (data) {
  feedback.innerHTML = '<p id=' + data + '><em></em></p>';
});
