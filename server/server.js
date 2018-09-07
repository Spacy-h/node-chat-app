const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  // socket.emit('newEmail', {
  //   from: 'Mike@example.com',
  //   text: 'Hey ! Whats up',
  //   createAt: 123
  // });

  // socket.emit('newMessage', {
  //   from: 'Server',
  //   text: 'Message from Server',
  //   createAt: 123
  // });

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  });
  // socket.on('createEmail', (newEmail) => {
  //   console.log('create Email', newEmail);
  // });

  socket.on('createMessage', (message) => {
    console.log('create Message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  })
});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
