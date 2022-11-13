import { Mensaje } from '../interfaces';
import { SQLiteDB } from '../services/db';

import SQLClient from '../services/messages';

// Instancio la clase, pasando al constructor el objeto con los datos de configuración de SQLite
// y el nombre de la tabla que va a utilizar
const sql = new SQLClient(SQLiteDB, 'messages');

export const add = async (msg: Mensaje) => {
  try {
    return await sql.createMessage(msg);
  } catch (error: any) {
    return error.message;
  }
};

export const getAll = async () => {
  try {
    const messages = await sql.listMessages();
    return {
      success: true,
      messages,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const createTableMsg = () => {
  try {
    sql.createTableMessages().then(() => {
      sql.createMessagesHardcoded().then(() => {
        console.log('Tabla mensajes y datos de prueba, creados con éxito!!');
        return;
      });
    });
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};
