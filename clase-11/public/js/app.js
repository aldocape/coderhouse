// El cliente está armando el túnel con el server
// Concepto de handshake
const socket = io.connect();

const form = document.getElementById('miFormulario');
const nombre = document.getElementById('inputUserName');
const text = document.getElementById('inputCuentanosAlgo');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cartaParaElServer = {
    nombre: nombre.value,
    texto: text.value,
  };

  socket.emit('evento', cartaParaElServer);

  nombre.value = '';
  text.value = '';
});

socket.emit('bienvenida', {
  msg: 'Hola estás en la app de web sockets',
});

socket.on('respuesta', (dataRecibidadesdeElServer) => {
  console.log(
    `El server me respondió con ${JSON.stringify(dataRecibidadesdeElServer)}`
  );
});
