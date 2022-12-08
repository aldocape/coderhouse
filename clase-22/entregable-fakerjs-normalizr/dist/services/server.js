"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http = require('http');
const index_1 = __importDefault(require("../routes/index"));
const messages_1 = require("../utils/messages");
const morgan_1 = __importDefault(require("morgan"));
// Importo librería socket.io
const io = require('socket.io');
const app = express_1.default();
// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path_1.default.resolve(__dirname, '../../public');
app.use(express_1.default.static(publicPath));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json()); //permite json
app.use(express_1.default.urlencoded({ extended: true })); //permite form data
app.use('/api', index_1.default);
// Esto de aquí abajo es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
// Configuración de server http para websocket
const myHTTPServer = http.Server(app);
const myWSServer = io(myHTTPServer);
// Escucho evento 'connection' con socket.io
myWSServer.on('connection', (socket) => {
    // Escucho cuando se emite evento de nuevo mensaje desde el form de chat en main.js
    socket.on('chatMessage', (userMsg) => {
        // Emito un evento para todos los sockets conectados
        myWSServer.emit('eventMessage', messages_1.formatMessage(userMsg.author.email, userMsg.text));
    });
});
exports.default = myHTTPServer;
