"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myHTTPServer = exports.numCPUs = exports.MODE = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const index_1 = __importDefault(require("../routes/index"));
const http = require('http');
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
app.use('/', index_1.default);
exports.PORT = config_1.default.ARGS.port; // default: '8080'
exports.MODE = config_1.default.ARGS.mode; // default: 'fork'
//Obtengo el numero de núcleos disponibles en mi PC
exports.numCPUs = os_1.default.cpus().length;
// Configuración de server http para websocket
exports.myHTTPServer = http.Server(app);
const myWSServer = io(exports.myHTTPServer);
