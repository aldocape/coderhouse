"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos winston como gestor de loggers
const winston_1 = __importDefault(require("winston"));
const { createLogger, format, transports } = winston_1.default;
const { combine, printf, timestamp, colorize } = format;
// Exporto la función que inicializa el proceso de logger
exports.default = createLogger({
    format: combine(timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
    }), colorize(), printf((info) => `${info.level} [${info.timestamp}] | ${info.message}`)),
    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.File({
            filename: './logs/warn.log',
            level: 'warn',
            maxsize: 5120000,
        }),
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
            maxsize: 5120000,
        }),
    ],
    exitOnError: false,
});
