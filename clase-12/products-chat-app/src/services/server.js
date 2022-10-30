const express = require('express');
const path = require('path');
const http = require('http');
const mainRouter = require('../routes/index');
const { engine } = require('express-handlebars');
const formatMessage = require('../utils/messages');

// Importo librería socket.io
const io = require('socket.io');

/** INICIALIZACION API con EXPRESS */
const app = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

// Le indico que voy a usar el motor de plantillas 'handlebars' y lo configuro
app.set('view engine', 'hbs');

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;
const partialsFolderPath = `${viewsFolderPath}/partials`;
const defaultLayoutPath = `${layoutsFolderPath}/index.hbs`;

app.set('views', viewsFolderPath);
app.engine(
  'hbs',
  engine({
    // Configuración de handlebars
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath,
  })
);

// Uso plantilla 'main' que a su vez contiene los 3 sectores que usaremos:
// carga de productos, listado de productos, y centro de mensajes
app.get('/', (req, res) => {
  res.render('main');
});

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

// Configuración de server http para websocket
const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

// Escucho evento 'connection' con socket.io
myWSServer.on('connection', (socket) => {
  // Escucho cuando se emite evento 'newProduct' desde el form de carga de productos
  socket.on('newProduct', (product) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit('eventProduct', product);
  });

  // Escucho cuando se emite evento de nuevo mensaje desde el form de chat en main.js
  socket.on('chatMessage', (userMsg) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit(
      'eventMessage',
      formatMessage(userMsg.userEmail, userMsg.userMessage)
    );
  });
});

module.exports = myHTTPServer;
