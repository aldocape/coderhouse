import express, { Express, Request, Response, NextFunction } from 'express';
import { Mensaje, Producto } from '../interfaces';
import { formatMessage, HttpException } from '../utils/tools';

const http = require('http');
import path from 'path';
import mainRouter from '../routes/index';
import loginRouter from '../routes/login';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import os from 'os';

// hideBin nos oculta el contenido del array _:[]
const args: any = yargs(hideBin(process.argv)).default('mode', 'fork').argv;
const argv: any = yargs(process.argv).argv;

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

app.use(loginRouter);
app.use('/api', mainRouter);

export const PORT = process.env.PORT || 8080;
export const MODE = args.mode; // default: 'fork'

//Obtengo el numero de núcleos disponibles en mi PC
export const numCPUs = os.cpus().length;

const info = {
  args,
  platform: process.platform,
  nodeversion: process.version,
  memory: JSON.stringify(process.memoryUsage().rss),
  execPath: argv._[0],
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
  res.status(404).send('<h1>Page not found</h1>');
});

// Configuración de server http para websocket
export const myHTTPServer = http.Server(app);

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
    myWSServer.emit(
      'eventMessage',
      formatMessage(userMsg.author, userMsg.text)
    );
  });
});

// export myHTTPServer;
