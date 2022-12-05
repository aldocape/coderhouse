import { SQLiteDB } from './db';
import { Mensaje } from '../interfaces';

export const createTable = async () => {
  await SQLiteDB.schema.dropTableIfExists('messages');
  await SQLiteDB.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.string('time', 50).notNullable();
    table.string('user', 100).notNullable();
    table.string('text', 400).notNullable();
  });
};

export const listMessages = () => {
  return SQLiteDB('messages').select('*');
};

export const createMessage = (message: Mensaje) => {
  return SQLiteDB('messages').insert(message);
};

// export const updateProduct = (product: Producto) => {
//   return mariaDB('products').where('id', product.id).update(product);
// };

// export const deleteProduct = (id: string) => {
//   return mariaDB('products').where('id', id).del();
// };
