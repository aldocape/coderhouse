const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const router = require('../routes/index');

const mainRouter = router;
// Importo librería socket.io
const io = require('socket.io');

/** INICIALIZACION API con EXPRESS */
const app = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;
const partialsFolderPath = `${viewsFolderPath}/partials`;
const defaultLayoutPath = `${layoutsFolderPath}/index.hbs`;

// Le indico que voy a usar el motor de plantillas 'handlebars'
app.set('view engine', 'hbs');

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

// app.get('/visitas', (req, res) => {
//   res.render('visitas', { layout: 'index' });
// });

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

myWSServer.on('connection', (socket) => {
  console.log('Se acaba de conectar un cliente');
  console.log('ID Socket Server', socket.id);
  console.log('ID Socket Cliente', socket.client.id);

  socket.emit('cargarListado');

  // productObj.getAll().then((products) => {
  //   console.log(products.products);
  // });

  // app.get('/api/productos', (req, res) => {
  //   res.json(products);
  // });

  socket.on('dataParaListado', (products) => {
    // console.log(products);

    socket.emit('respuestaList', products);
  });

  socket.emit('respuesta', { recibido: 'ok' });

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

app.get('/', (req, res) => {
  res.render('main');
});

module.exports = myHTTPServer;
