"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const server_1 = __importDefault(require("./services/server"));
const minimist_1 = __importDefault(require("minimist"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const argumentos = minimist_1.default(process.argv.slice(2));
exports.PORT = argumentos.puerto || 8080;
console.log(argumentos);
server_1.default.listen(exports.PORT, () => console.log(`Servidor express escuchando en el puerto ${exports.PORT} - PID WORKER ${process.pid}`));
