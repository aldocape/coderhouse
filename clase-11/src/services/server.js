const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

myWSServer.on('connection', (socket) => {
  console.log('Se acaba de conectar un cliente');
  console.log('ID Socket Server', socket.id);
  console.log('ID Socket Cliente', socket.client.id);

  socket.on('evento', (dataRecibida) => {
    console.log(
      `El cliente ${socket.client.id} me acaba de mandar un mensaje del tipo evento`
    );
    console.log(dataRecibida);

    socket.emit('respuesta', { recibido: 'ok' });
  });

  socket.on('bienvenida', (dataRecibida) => {
    console.log('Me acaban de mandar un mensaje del tipo bienvenida');
    console.log(dataRecibida);
  });
});

module.exports = myHTTPServer;
