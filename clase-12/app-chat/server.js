const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const botName = 'Administrador';

// Seteo la carpeta con contenido estático
app.use(express.static(path.join(__dirname, 'public')));

// Esto se ejecuta cuando un cliente se conecta
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // socket.emit envía mensaje al usuario conectado
    socket.emit(
      'eventMessage',
      formatMessage(botName, 'Bienvenido a Chatcord')
    );

    // El broadcast envía mensaje a todos menos al usuario
    socket.broadcast
      .to(user.room)
      .emit(
        'eventMessage',
        formatMessage(botName, `El usuario ${username} se ha conectado`)
      );

    // Envío info de usuarios y sala al html
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Escucho cuando se emite mensaje desde el form de chat
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('eventMessage', formatMessage(user.username, msg));
  });

  // Esto se ejecuta cuando el usuario se desconecta
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    // io.emit envía el mensaje a todos los de la sala user.room, incluído el propio usuario
    if (user) {
      io.to(user.room).emit(
        'eventMessage',
        formatMessage(botName, `${user.username} ha salido del chat`)
      );
      // Envío info de usuarios y sala al html
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
