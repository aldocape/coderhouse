"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myHTTPServer = exports.numCPUs = exports.MODE = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const tools_1 = require("../utils/tools");
const http = require('http');
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../routes/index"));
const login_1 = __importDefault(require("../routes/login"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const os_1 = __importDefault(require("os"));
// hideBin nos oculta el contenido del array _:[]
const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).default('mode', 'fork').argv;
const argv = (0, yargs_1.default)(process.argv).argv;
// Importo librería socket.io
const io = require('socket.io');
const app = (0, express_1.default)();
// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path_1.default.resolve(__dirname, '../../public');
app.use(express_1.default.static(publicPath));
app.use(express_1.default.json()); //permite json
app.use(express_1.default.urlencoded({ extended: true })); //permite form data
// Le indico que voy a usar el motor de plantillas 'ejs'
app.set('view engine', 'ejs');
app.use(login_1.default);
app.use('/api', index_1.default);
exports.PORT = process.env.PORT || 8080;
exports.MODE = args.mode; // default: 'fork'
//Obtengo el numero de núcleos disponibles en mi PC
exports.numCPUs = os_1.default.cpus().length;
const info = {
    args,
    platform: process.platform,
    nodeversion: process.version,
    memory: JSON.stringify(process.memoryUsage().rss),
    execPath: argv._[0],
    proyectPath: process.cwd(),
    pid: process.pid,
    numCPUs: exports.numCPUs,
};
// Incorporación del endpoint /info para mostrar datos de variable global 'process'
app.get('/info', (req, res) => {
    res.render('info', { info });
});
// Middleware para mostrar si hubo algún error
app.use(function (err, req, res, next) {
    if (err instanceof tools_1.HttpException) {
        return res.status(err.status).json({
            msg: 'There was an unexpected error',
            error: err.message,
        });
    }
    next(err);
});
// Esto es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
// Configuración de server http para websocket
exports.myHTTPServer = http.Server(app);
const myWSServer = io(exports.myHTTPServer);
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
        myWSServer.emit('eventMessage', (0, tools_1.formatMessage)(userMsg.author, userMsg.text));
    });
});
// export myHTTPServer;
