import mongoose from 'mongoose';
import moment from 'moment';

export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const ObjectId = mongoose.Types.ObjectId;

// Función para validar que un ObjectId sea válido
export function isValidObjectId(id: string) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

// Función auxiliar para darle formato a la fecha y la hora en el centro de mensajes
export function formatMessage(author: any, text: string) {
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
}

export const arrayRandom = (cant: number = 100000000) => {
  //Devuelve un numero aleatorio entre 2 numeros pasados por parametros
  //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const salida: any = {};

  // En cada bucle, cada número entre 1 y 1000 se elige aleatoriamente y se le suma 1, para indicar que salió 'sorteado'
  // La sumatoria del total de los valores de cada 'key' debería dar como resultado el número 'cant'
  for (let i = 0; i < cant; i++) {
    const valor = between(1, 1000);

    // Se genera como clave (índice) del array el número random entre 0 y 1000
    if (salida[valor]) salida[valor] = salida[valor] + 1;
    else salida[valor] = 1;
  }

  return salida;
};

process.on('message', (cant: number) => {
  if (cant) {
    console.log(`Start calculo, PID: ${process.pid}`);
    const result = arrayRandom(cant);
    process.send!(result);
  }
});
