import { save, getMany } from '../daos/daos';
import { Mensaje } from '../interfaces';

export async function saveMessage(message: Mensaje) {
  const msg = await save('message', message);
  return msg;
}

export async function getAllMessages(query: any) {
  const messages = await getMany('message', query);
  return messages;
}
