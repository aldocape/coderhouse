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
export function formatMessage(user: any, message: string) {
  return {
    user,
    message,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
}
