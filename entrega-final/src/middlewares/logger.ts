// Importamos winston como gestor de loggers
import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;

// Exporto la función que inicializa el proceso de logger
export default createLogger({
  format: combine(
    timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    colorize(),
    printf((info) => `${info.level} [${info.timestamp}] | ${info.message}`)
  ),
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
