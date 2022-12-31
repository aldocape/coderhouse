// Importo estructura de datos y esquema de manejo de base de datos para mensajes
import { Mensaje } from '../interfaces';
import MessagesModel from '../models/messages';

// Importo métodos de librería normalizr para normalizar lo que llega de la BD
import { normalize, schema, denormalize } from 'normalizr';

import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, '../../messages.json');
const normalizedPath = path.resolve(__dirname, '../../messagesNormalized.json');
const desnormalizedPath = path.resolve(
  __dirname,
  '../../messagesdesNormalized.json'
);

const author = new schema.Entity(
  'author',
  {},
  {
    idAttribute: 'email',
  }
);

const message = new schema.Entity(
  'message',
  { author: author },
  {
    idAttribute: '_id',
  }
);

const finalSchema = [message];

// Clase Messages con persistencia de datos en MongoDB

class Messages {
  // Método getAll obtiene todos los mensajes

  async getAll() {
    //El lean es para indicar que queremos como respuesta un objeto simple
    const messages = await MessagesModel.find().lean();

    let contenido = JSON.stringify(messages, null, '\t');

    await fs.promises.writeFile(inputPath, contenido);

    return {
      messages,
      tamanio: contenido.length,
    };
  }

  // Método 'add' agrega un documento de tipo producto a la colección 'products'
  async add(message: Mensaje) {
    const newMessage = await MessagesModel.create(message);
    return newMessage;
  }

  async getAllNormalized() {
    //El lean es para indicar que queremos como respuesta un objeto simple
    const messages = await MessagesModel.find().lean();

    const normalizedData = normalize(messages, finalSchema);

    let contenido = JSON.stringify(normalizedData, null, '\t');

    await fs.promises.writeFile(normalizedPath, contenido);

    const dataOriginal = await fs.promises.readFile(inputPath, 'utf-8');

    return {
      messages: normalizedData,
      tamanio: contenido.length,
      tamanioOriginal: dataOriginal.length,
    };
  }

  async getAllDenormalized() {
    //El lean es para indicar que queremos como respuesta un objeto simple
    const data = await fs.promises.readFile(normalizedPath, 'utf-8');

    const normalized = JSON.parse(data);

    const denormalizedData = denormalize(
      normalized.result,
      finalSchema,
      normalized.entities
    );

    let contenido = JSON.stringify(denormalizedData, null, '\t');

    await fs.promises.writeFile(desnormalizedPath, contenido);

    return {
      messages: denormalizedData,
      tamanio: contenido.length,
    };
  }
}

const msgInstance = new Messages();

// Exporto una instancia de la clase Products
export default msgInstance;
