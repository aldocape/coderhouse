import fs from 'fs';
import path from 'path';
import { Mensaje } from '../interfaces';

// Clase para manejo de carga de datos en archivos usando la librería filesystem

/*
  Los métodos de la clase pueden devolver los siguientes valores

  success: Devuelve true o false, dependiendo si pudo o no realizar con éxito la operación
  msg: Mensaje explicativo del resultado obtenido
  item: Devuelve el o los objetos solicitados
*/

class Files {
  archivo: string;
  constructor(archivo: string) {
    this.archivo = archivo;
  }

  async saveItem(item: Mensaje) {
    const filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor
      const content = await fs.promises.readFile(filePath, 'utf8');

      // Si salió todo bien, es decir, no se va al catch, entonces almaceno los datos como objeto
      const itemsList = JSON.parse(content);

      // Agrego al array el nuevo item
      itemsList.push(item);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(itemsList, null, 2)
        );

        // Devuelvo el item nuevo y un booleano que indica que salió todo bien
        return {
          item,
          success: true,
        };
      } catch (err: any) {
        // Si hubo un error al escribir, lo devuelvo
        return {
          success: false,
          msg: err.message,
        };
      }
    } catch (err: any) {
      // Este catch viene desde el primer try, significa que si entró aquí,
      // o bien no existe el archivo, o bien tiene algún error al leerlo
      // Para el caso que no exista, lo verifico con el código 'ENOENT'

      if (err.code === 'ENOENT') {
        try {
          // El archivo no existe, significa que es el primer mensaje
          // Guardo en un array el mensaje, y lo escribo en el archivo
          await fs.promises.writeFile(
            filePath,
            JSON.stringify([item], null, 2)
          );

          // Devuelvo el item ingresado y un booleano que indica que salió todo bien
          return {
            item,
            success: true,
          };
        } catch (err: any) {
          // Si hubo un error al escribir en el archivo, lo devuelvo para usar en la API
          return {
            success: false,
            msg: err.message,
          };
        }
      } else {
        // Devuelvo para mostrar en api si llega a haber algún error distinto al 'ENOENT'
        return {
          success: false,
          msg: err.message,
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
      const items = JSON.parse(content);

      // Devuelvo el array de objetos
      return {
        success: true,
        items,
      };
    } catch (err: any) {
      // Si hubo un error al leer, devuelvo ese error
      return {
        success: false,
        msg: err.message,
      };
    }
  }
}

// Usaremos el archivo 'messages.json' ubicado en la raíz del proyecto para guardar los mensajes
const messagesObj = new Files('../../messages.json');

export { messagesObj };
