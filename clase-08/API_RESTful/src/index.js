const express = require('express');
const path = require('path');
const PORT = 8080;

const mainRouter = require('./routes/index');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

// Inicializo el servidor en el puerto seleccionado
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server.on('error', (error) => console.log(`Error en servidor ${error}`));
