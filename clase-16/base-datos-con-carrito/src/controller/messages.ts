// import { messagesObj } from './files';
import { Mensaje } from '../interfaces';

import { createMessage, listMessages } from '../services/messages';

// Lógica de negocio/api para el manejo de Mensajes
class Messages {
  // Método 'add' agrega un mensaje a la lista, o en caso que no exista ninguno, crea el archivo y el mensaje
  // async add(msg: Mensaje) {
  //   const newMessage = await messagesObj.saveItem(msg);
  //   return newMessage;
  // }

  async add(msg: Mensaje) {
    try {
      const newMessage = await createMessage(msg);
      return newMessage;
    } catch (error: any) {
      return error.message;
    }
  }

  // // Método getById obtiene un mensaje por id
  // async getById(id: string) {
  //   const product = await messagesObj.getById(id);
  //   return product;
  // }

  // Método getAll obtiene todos los mensajes
  async getAll() {
    try {
      const messages = await listMessages();
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
  }

  // // Método deleteById elimina un producto por id
  // async deleteById(id: string) {
  //   const result = await messagesObj.deleteById(id);
  //   return result;
  // }
}

const msgInstance = new Messages();

// Exporto una instancia de la clase Messages
export default msgInstance;
