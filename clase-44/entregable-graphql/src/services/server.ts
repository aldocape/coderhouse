import express, { Express, Request, Response, NextFunction } from 'express';

import { Mensaje, Carrito } from '../interfaces';
import { formatMessage, HttpException } from '../utils/tools';
import { graphqlHTTP } from 'express-graphql';
import { graphqlRoot, graphqlSchema } from './graphql.services';

import path from 'path';
import mainRouter from '../routes/index';

import logger from '../middlewares/logger';
import config from '../config';

import os from 'os';
import ProductsDTO from '../dto/products.dto';

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

// Middleware para hacer loggers 'info' de cada ruta y método
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Ruta '${req.baseUrl}${req.url}' | Método '${req.method}'`);
  next();
});

app.use('/', mainRouter);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true,
  })
);

export const PORT = config.ARGS.port; // default: '8080'
export const MODE = config.ARGS.mode; // default: 'fork'

//Obtengo el numero de núcleos disponibles en mi PC
export const numCPUs = os.cpus().length;

const info = {
  args: config.ARGS,
  platform: process.platform,
  nodeversion: process.version,
  memory: JSON.stringify(process.memoryUsage().rss),
  execPath: config.ARGV._[0],
  proyectPath: process.cwd(),
  pid: process.pid,
  numCPUs,
};

// Incorporación del endpoint /info para mostrar datos de variable global 'process'
app.get('/info', (req, res) => {
  res.render('info', { info });
});

// Middleware para mostrar si hubo algún error
app.use(function (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      msg: 'There was an unexpected error',
      error: err.message,
    });
  }
  next(err);
});

// Esto es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req: Request, res: Response) => {
  logger.warn('Ruta inexistente');
  res.status(404).send('<h1>Page not found</h1>');
});

// Configuración de server http para websocket
export const myHTTPServer = http.Server(app);

const myWSServer = io(myHTTPServer);

// Escucho evento 'connection' con socket.io
myWSServer.on('connection', (socket: any) => {
  // Escucho cuando se emite evento 'newProduct' desde el form de carga de productos
  socket.on('newProduct', (product: any) => {
    // Convierto el objeto usando DTO para que se muestre bien en el front
    // const productModified = new ProductsDTO(
    //   product,
    //   config.ARGS.dao === 'mongo'
    // );

    const productModified = new ProductsDTO(product, false);

    // Emito un evento para todos los sockets conectados
    myWSServer.emit('eventProduct', productModified);
  });

  // Escucho cuando se emite evento de nuevo mensaje desde el form de chat en main.js
  socket.on('chatMessage', (userMsg: Mensaje) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit(
      'eventMessage',
      formatMessage(userMsg.author, userMsg.text)
    );
  });

  // Escucho cuando se emite evento 'newCart' desde el front (botón "Confirmar carrito")
  socket.on('newCart', (cart: Carrito) => {
    // Emito un evento para todos los sockets conectados
    myWSServer.emit('eventCart', cart);
  });
});
