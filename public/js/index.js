var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');

//   socket.emit('createEmail', {
//     to: 'jen@example.com',
//     text: 'Hey this is sparsh'
//   });
// });

// socket.emit('createMessage', {
//   from: 'Client',
//   text: 'Message from Client'
//   });
});
socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });
socket.on('newMessage', function(message) {
  console.log('newMessage:', message);
 });
