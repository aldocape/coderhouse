// const moment = require('moment');
import moment from 'moment';

// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
export function formatMessage(user: string, text: string) {
  return {
    user,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
}

// module.exports = formatMessage;
