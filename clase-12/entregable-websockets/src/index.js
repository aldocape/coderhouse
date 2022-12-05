const server = require('./services/server');

const PORT = 8080;

// Inicializo el servidor en el puerto seleccionado
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server.on('error', (error) => console.log(`Error en servidor ${error}`));
