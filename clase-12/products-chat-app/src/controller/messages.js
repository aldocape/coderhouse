const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class Mensajes {
  constructor(archivo) {
    this.archivo = archivo;
  }

  // Métodos de la clase 'Mensajes'
  // Clase utilizada para que los mensajes de chat persistan en un archivo .json

  // Método 'save' agrega un mensaje a la lista, o crea el archivo y el mensaje nuevo, en caso contrario

  async save(obj) {
    const filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor

      const content = await fs.promises.readFile(filePath, 'utf8');

      // Si salió todo bien, o sea, no se va al catch, entonces almaceno los datos como objeto
      const messages = JSON.parse(content);
      obj.id = uuidv4();

      // Agrego al array el nuevo mensaje
      messages.push(obj);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(messages, null, 2)
        );

        // Devuelvo el id del nuevo mensaje y un booleano que indica que salió todo bien
        return {
          id: obj.id,
          success: true,
        };
      } catch (err) {
        // Si hubo un error al escribir, lo devuelvo
        return {
          success: false,
          err,
        };
      }
    } catch (err) {
      // Este catch viene desde el primer try, significa que si entró aquí,
      // o bien no existe el archivo, o bien tiene algún error al leerlo
      // Para el caso que no exista, lo verifico con el código 'ENOENT'
      if (err.code === 'ENOENT') {
        try {
          // El archivo no existe, significa que es el primer mensaje
          // Guardo en un array el mensaje, y lo escribo en el archivo
          obj.id = uuidv4();
          await fs.promises.writeFile(filePath, JSON.stringify([obj], null, 2));

          // Devuelvo el id del nuevo mensaje y un booleano que indica que salió todo bien
          return {
            id: obj.id,
            success: true,
          };
        } catch (err) {
          // Si hubo un error al escribir en el archivo, lo devuelvo para usar en la API
          return {
            success: false,
            err,
          };
        }
      } else {
        // Devuelvo para mostrar en api si llega a haber algún error distinto al 'ENOENT'
        return {
          success: false,
          err,
        };
      }
    }
  }
  // Método para obtener todos los mensajes
  async getAll() {
    try {
      // Intento leer el archivo
      const filePath = path.resolve(__dirname, this.archivo);

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Transformo la data que llegó en un array de objetos
      const info = JSON.parse(content);

      // Devuelvo el array de objetos
      return {
        success: true,
        messages: info,
      };
    } catch (err) {
      // Si hubo un error al leer, devuelvo ese error
      return {
        success: false,
        err,
      };
    }
  }
}

// Usaremos el archivo 'chatMessages.json' ubicado en la raíz del proyecto
const messagesObj = new Mensajes('../../chatMessages.json');

module.exports = messagesObj;
