import MessagesModel from '../models/messages';
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

export const getAll = async () => {
  try {
    const messages = await MessagesModel.find().lean();

    let contenido = JSON.stringify(messages, null, '\t');

    await fs.promises.writeFile(inputPath, contenido);

    return {
      success: true,
      messages,
      tamanio: contenido.length,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const getAllNormalized = async () => {
  try {
    //El lean es para indicar que queremos como respuesta un objeto simple
    const messages = await MessagesModel.find().lean();

    const normalizedData = normalize(messages, finalSchema);

    let contenido = JSON.stringify(normalizedData, null, '\t');

    await fs.promises.writeFile(normalizedPath, contenido);

    const dataOriginal = await fs.promises.readFile(inputPath, 'utf-8');

    return {
      success: true,
      messages: normalizedData,
      tamanio: contenido.length,
      tamanioOriginal: dataOriginal.length,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const desnormalized = async () => {
  try {
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
      success: true,
      messages: denormalizedData,
      tamanio: contenido.length,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};
