import express, { Request, Response } from 'express';
import path from 'path';

const http = require('http');
import mainRouter from '../routes/index';
import { formatMessage } from '../utils/messages';
import { Producto, Mensaje } from '../interfaces';
import morgan from 'morgan';

// Atención!! En cada inicio de la aplicación, se destruye la tabla mensajes y productos
// y se vuelven a crear con datos de prueba 'hardcodeados' que se cargan en la misma función
// Para cambiar este comportamiento, comentar el import y la función de las 2 líneas de abajo una vez creadas las tablas
// De esta manera, los datos que se carguen persisten en las bases de datos correspondientes
// import { createTables } from '../utils/createTables';
// createTables();

// Importo librería socket.io
const io = require('socket.io');

const app = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.use(morgan('dev'));
app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

// Esto de aquí abajo es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>Page not found</h1>');
});

// Configuración de server http para websocket
const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

// Escucho evento 'connection' con socket.io
myWSServer.on('connection', (socket: any) => {
  // Escucho cuando se emite evento 'newProduct' desde el form de carga de productos
  socket.on('newProduct', (product: Producto) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit('eventProduct', product);
  });

  // Escucho cuando se emite evento de nuevo mensaje desde el form de chat en main.js
  socket.on('chatMessage', (userMsg: Mensaje) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit('eventMessage', formatMessage(userMsg.user, userMsg.text));
  });
});

export default myHTTPServer;
