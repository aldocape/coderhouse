"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tools_1 = require("../utils/tools");
const http = require('http');
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../routes/index"));
const login_1 = __importDefault(require("../routes/login"));
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
        myWSServer.emit('eventMessage', (0, tools_1.formatMessage)(userMsg.author, userMsg.text));
    });
});
exports.default = myHTTPServer;
