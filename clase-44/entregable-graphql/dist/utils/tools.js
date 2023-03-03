"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayRandom = exports.formatMessage = exports.isValidObjectId = exports.ObjectId = exports.HttpException = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
exports.ObjectId = mongoose_1.default.Types.ObjectId;
// Función para validar que un ObjectId sea válido
function isValidObjectId(id) {
    if (exports.ObjectId.isValid(id)) {
        if (String(new exports.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
exports.isValidObjectId = isValidObjectId;
// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
function formatMessage(author, text) {
    return {
        author,
        text,
        time: (0, moment_1.default)().format('DD/MM/YYYY hh:mm:ss'),
    };
}
exports.formatMessage = formatMessage;
const arrayRandom = (cant = 100000000) => {
    //Devuelve un numero aleatorio entre 2 numeros pasados por parametros
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const between = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const salida = {};
    // En cada bucle, cada número entre 1 y 1000 se elige aleatoriamente y se le suma 1, para indicar que salió 'sorteado'
    // La sumatoria del total de los valores de cada 'key' debería dar como resultado el número 'cant'
    for (let i = 0; i < cant; i++) {
        const valor = between(1, 1000);
        // Se genera como clave (índice) del array el número random entre 0 y 1000
        if (salida[valor])
            salida[valor] = salida[valor] + 1;
        else
            salida[valor] = 1;
    }
    return salida;
};
exports.arrayRandom = arrayRandom;
process.on('message', (cant) => {
    if (cant) {
        console.log(`Start calculo, PID: ${process.pid}`);
        const result = (0, exports.arrayRandom)(cant);
        process.send(result);
    }
});
