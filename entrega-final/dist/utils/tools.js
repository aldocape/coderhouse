"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = exports.isValidObjectId = exports.ObjectId = exports.HttpException = void 0;
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
