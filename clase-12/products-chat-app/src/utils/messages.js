const moment = require('moment');

// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
function formatMessage(user, text) {
  return {
    user,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
}

module.exports = formatMessage;
