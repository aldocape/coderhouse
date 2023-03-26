import fs from 'fs';
import path from 'path';
import MessagesDTO from '../../dto/messages.dto';
import ProductsDTO from '../../dto/products.dto';
import logger from '../../middlewares/logger';

import { v4 as uuidv4 } from 'uuid';

export default class DaoFileSystem {
  private collection: string;
  private file: string;
  private static instance: DaoFileSystem;

  private constructor(collection: string) {
    this.collection = collection;
    this.file = '';

    switch (collection) {
      case 'product':
        this.file = '../../../products.json';
        break;
      case 'cart':
        this.file = '../../../carts.json';
        break;
      case 'message':
        this.file = '../../../messages.json';
        break;

      default:
        break;
    }
  }

  public static getInstance(collection: string): DaoFileSystem {
    DaoFileSystem.instance = new DaoFileSystem(collection);
    logger.info(`Instancia de clase: ${collection} iniciada`);
    return DaoFileSystem.instance;
  }

  async getAll() {
    try {
      // Intento leer el archivo
      const filePath = path.resolve(__dirname, this.file);

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Transformo la data que llegó en un array de objetos
      const items = JSON.parse(content);

      if (items)
        switch (this.collection) {
          case 'product':
            return items.map(
              (producto: any) => new ProductsDTO(producto, false)
            );
          case 'message':
            return items.map((message: any) => new MessagesDTO(message, false));
          default:
            break;
        }
    } catch (err: any) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async getById(id: String) {
    try {
      // Intento leer el archivo, y si existe guardo los datos en un objeto 'info'
      const filePath = path.resolve(__dirname, this.file);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const info = JSON.parse(content);

      // Con el método 'find' de array, busco el item que tenga el mismo id que el que se busca
      let item = info.find((e: any) => e.id == id);

      if (item)
        switch (this.collection) {
          case 'product':
            return new ProductsDTO(item, false);

          case 'message':
            return new MessagesDTO(item, false);
          default:
            break;
        }
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async save(document: any) {
    const filePath = path.resolve(__dirname, this.file);
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor
      const content = await fs.promises.readFile(filePath, 'utf8');

      // Si salió todo bien, es decir, no se va al catch, entonces almaceno los datos como objeto
      const itemsList = JSON.parse(content);
      document.id = uuidv4();

      // Agrego al array el nuevo item
      itemsList.push(document);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(itemsList, null, 2)
        );

        // Devuelvo el nuevo objeto
        return document;
      } catch (err: any) {
        // Si hubo un error al escribir, lo devuelvo
        logger.error(`ERROR => ${err}`);
      }
    } catch (err: any) {
      // Este catch viene desde el primer try, significa que si entró aquí,
      // o bien no existe el archivo, o bien tiene algún error al leerlo
      // Para el caso que no exista, lo verifico con el código 'ENOENT'

      if (err.code === 'ENOENT') {
        try {
          // El archivo no existe, significa que es el primer elemento
          // Guardo en un array el elemento, y lo escribo en el archivo
          document.id = uuidv4();
          await fs.promises.writeFile(
            filePath,
            JSON.stringify([document], null, 2)
          );

          // Devuelvo el nuevo objeto creado
          return document;
        } catch (err: any) {
          // Si hubo un error al escribir en el archivo, lo devuelvo para usar en la API
          logger.error(`ERROR => ${err}`);
        }
      } else {
        // Devuelvo para mostrar en api si llega a haber algún error distinto al 'ENOENT'
        return err.message;
      }
    }
  }

  async deleteById(id: String) {
    const filePath = path.resolve(__dirname, this.file);
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id buscado
      // No uso la comparación estricta, por si algún id era numérico en la BD y el req.params lo recibe como string
      const index = info.findIndex((item: any) => item.id == id);

      // Si index = -1, el elemento con ese id no existe
      if (index < 0) {
        return {
          error: 'Elemento no encontrado',
        };
      }

      // Si el producto buscado existe, lo elimino en el array con el método 'splice'
      info.splice(index, 1);

      try {
        // Intento escribir los datos del nuevo array en el archivo
        await fs.promises.writeFile(filePath, JSON.stringify(info, null, 2));
        return 1;
      } catch (err: any) {
        logger.error(`ERROR => ${err}`);
      }
    } catch (err: any) {
      // Muestro el error en caso de que no haya podido leer el archivo
      logger.error(`ERROR => ${err}`);
    }
  }

  async deleteAll() {
    const filePath = path.resolve(__dirname, this.file);
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(filePath, 'utf8');

      try {
        // Intento escribir el nuevo array vacío en el archivo
        await fs.promises.writeFile(filePath, JSON.stringify([], null, 2));
        return 1;
      } catch (err: any) {
        logger.error(`ERROR => ${err}`);
      }
    } catch (err: any) {
      // Muestro el error en caso de que no haya podido leer el archivo
      logger.error(`ERROR => ${err}`);
    }
  }

  async update(id: string, item: any) {
    const filePath = path.resolve(__dirname, this.file);
    try {
      // Intento leer el archivo

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id del objeto que recibe la función por parámetro
      const index = info.findIndex((elem: any) => item.id === elem.id);

      // Si index = -1, el item con ese id no existe
      if (index < 0) {
        return {
          msg: 'Elemento no encontrado',
        };
      }

      // Si el item buscado existe, lo reemplazo con el nuevo que viene por parámetro
      info.splice(index, 1, item);

      try {
        // Intento escribir los datos del nuevo array en el archivo
        await fs.promises.writeFile(filePath, JSON.stringify(info, null, 2));
        return item;
      } catch (err: any) {
        // Si hubo error al escribir, lo devuelvo a la api
        logger.error(`ERROR => ${err}`);
      }
    } catch (err: any) {
      // Devuelvo error a la api en caso de que no haya podido leer el archivo
      logger.error(`ERROR => ${err}`);
    }
  }

  async findOne(field: any) {
    const filePath = path.resolve(__dirname, this.file);
    try {
      const content = await fs.promises.readFile(filePath, 'utf8');
      const info = JSON.parse(content);

      // Con el método 'find' de array, busco el item que tenga el mismo id que el que se busca
      let item = info.find((e: any) => field.username == e.username);

      if (item) return item;
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }
}
