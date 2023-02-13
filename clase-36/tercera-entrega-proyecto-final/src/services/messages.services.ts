import { save, getAll } from '../daos/daos';
import { Mensaje } from '../interfaces';

// Importo métodos de librería normalizr para normalizar lo que llega de la BD
import { normalize, schema, denormalize } from 'normalizr';

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
    idAttribute: 'id',
  }
);

const finalSchema = [message];

export async function saveMessage(message: Mensaje) {
  const msg = await save('message', message);
  return msg;
}

export async function getAllMessages() {
  const messages = await getAll('message');
  return messages;
}

export async function getAllNormalized() {
  const messages = await getAll('message');
  const normalizedData = normalize(messages, finalSchema);

  console.log(messages);
  console.log(normalizedData);

  return {
    messages: normalizedData,
  };
}

export async function getAllDenormalized() {
  const normalized: any = await getAllNormalized();

  const denormalizedData = denormalize(
    normalized.result,
    finalSchema,
    normalized.entities
  );

  return {
    messages: denormalizedData,
  };
}
