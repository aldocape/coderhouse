import moment from 'moment';

// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
export function formatMessage(author: any, text: string) {
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
}
