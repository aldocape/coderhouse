"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
const moment_1 = __importDefault(require("moment"));
// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
function formatMessage(author, text) {
    return {
        author,
        text,
        time: moment_1.default().format('DD/MM/YYYY hh:mm:ss'),
    };
}
exports.formatMessage = formatMessage;
