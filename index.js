var express = require('express');
var socket = require('socket.io');

// Set App
var app = express();


var server = app.listen(4000, function () {
  console.log('Port 4000');
});

// Socket setup
var io = new socket(server);

// Static files
app.use(express.static('public'));


io.on('connection', function (socket) {
  console.log('Made socket connection ', socket.id);

  // set the connections limit.
  //limitConnections(socket);

  // send the message to all connected users.
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  // send "is typing.." to all users except the typing user.
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

  // when the user decides to not send the message and delete it remove "is typing".
  socket.on('notTyping', function(data){
    socket.broadcast.emit('notTyping', data);
  });

});

function limitConnections(socket){
  if (io.engine.clientsCount > connectionsLimit) {
    socket.emit('err', { message: 'reach the limit of connections' })
    socket.disconnect()
    console.log('Disconnected...')
    return
  }
};
