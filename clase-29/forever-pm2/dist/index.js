"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const minimist_1 = __importDefault(require("minimist"));
const optionalArgsObject = {
    alias: {
        //Para pasar un alias a los argumentos que nos envian
        p: 'puerto',
    },
    default: {
        //Si no nos envian el argumento, se setea por default
        puerto: '8080',
    },
};
const args = (0, minimist_1.default)(process.argv, optionalArgsObject);
const PORT = args.puerto;
server_1.default.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`));
