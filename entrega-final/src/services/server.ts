import express, { Express } from 'express';

import os from 'os';
import path from 'path';
import config from '../config';
import mainRouter from '../routes/index';
// Importo ProductsDTO para convertir un producto una vez creado, y mandarlo por websockets al front
import ProductsDTO from '../dto/products.dto';
// Importo librería swagger-ui-express y yamljs para la documentación del proyecto
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const http = require('http');

// Importo librería socket.io
const io = require('socket.io');

const app: Express = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

// Le indico que voy a usar el motor de plantillas 'ejs'
app.set('view engine', 'ejs');

app.use('/', mainRouter);

// Indico el path del archivo yml de configuración de swagger
const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);

// Indico el path en donde se va a mostrar la documentación con swagger
// y le paso los middlewares correspondientes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

let puerto;
if (config.NODE_ENV === 'development') {
  puerto = config.ARGS.port; // default: '8080'
} else {
  puerto = 8080;
}
export const PORT = puerto;
export const MODE = config.ARGS.mode; // default: 'fork'

//Obtengo el numero de núcleos disponibles en mi PC
export const numCPUs = os.cpus().length;

// Configuración de server http para websocket
export const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

// Escucho evento 'connection' con socket.io
myWSServer.on('connection', (socket: any) => {
  // Escucho evento newBot que llega desde el login del front
  socket.on('newBot', (user: any) => {
    // Emito un evento para el usuario para saludarlo con su nombre
    socket.emit('createBot', user.nombre);
  });

  // Escucho cuando se emite evento 'newProduct' desde el form de carga de productos
  socket.on('newProduct', (product: any) => {
    // Convierto el objeto usando DTO para que se muestre bien en el front
    const productModified = new ProductsDTO(
      product,
      config.ARGS.dao === 'mongo'
    );

    // Emito un evento de nuevo producto para todos los sockets conectados
    myWSServer.emit('createProduct', productModified);
  });

  // Escucho cuando se emite evento de nuevo mensaje desde el chatBot
  socket.on('newMessage', (newMsg: any) => {
    // Emito un evento para el usuario, contestando de acuerdo al mensaje recibido
    let response: string;

    switch (newMsg.message) {
      case 'stock':
        if (newMsg.object.length) {
          response = '<p>Stock de todos los productos:<br />';
          newMsg.object.forEach((product: any) => {
            response += `- Nombre: ${product.nombre}, stock: ${product.stock}<br />`;
          });
          response += '</p>';
        } else {
          response = '<p>No hay productos cargados</p>';
        }
        break;

      case 'orden':
        response =
          '<p>Tu orden de compra está compuesta de muchos productos buenos y baratos!</p>';
        break;

      case 'carrito':
        if (newMsg.object.length) {
          response =
            '<p>Tu carrito tiene actualmente los siguientes productos:<br />';
          newMsg.object.forEach((product: any) => {
            response += `- Nombre: ${product.nombre}, cantidad: ${product.cantidad}<br />`;
          });
          response += '</p>';
        } else {
          response = '<p>Tu carrito aún no tiene productos cargados</p>';
        }
        break;

      default:
        response =
          '<p>No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones:<br /><br />- Stock: Para conocer el stock de todos los productos.<br /><br />-Carrito: Para conocer el estado actual de tu carrito.</p>';
        break;
    }
    socket.emit('newResponse', response);
  });

  // // Escucho cuando se emite evento 'newCart' desde el front (botón "Confirmar carrito")
  // socket.on('newCart', (cart: Carrito) => {
  //   // Emito un evento para todos los sockets conectados
  //   myWSServer.emit('eventCart', cart);
  // });
});
