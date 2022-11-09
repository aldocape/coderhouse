import fs from 'fs';
import path from 'path';
import { Producto, Carrito } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

// Clase para manejo de carga de datos en archivos usando la librería filesystem

/*
  Los métodos de la clase pueden devolver los siguientes valores

  id: Por ejemplo cuando cargo un nuevo item, devuelve el id asignado al mismo
  success: Devuelve true o false, dependiendo si pudo o no realizar con éxito la operación
  msg: Mensaje explicativo del resultado obtenido
  item: Devuelve el o los objetos solicitados
*/

class Files {
  archivo: string;
  constructor(archivo: string) {
    this.archivo = archivo;
  }

  async saveItem(item: Producto | Carrito) {
    const filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor
      const content = await fs.promises.readFile(filePath, 'utf8');

      // Si salió todo bien, es decir, no se va al catch, entonces almaceno los datos como objeto
      const itemsList = JSON.parse(content);
      item.id = uuidv4();

      // Agrego al array el nuevo item
      itemsList.push(item);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(itemsList, null, 2)
        );

        // Devuelvo el id del nuevo producto y un booleano que indica que salió todo bien
        return {
          id: item.id,
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
          // El archivo no existe, significa que es el primer producto
          // Guardo en un array el producto, y lo escribo en el archivo
          item.id = uuidv4();
          await fs.promises.writeFile(
            filePath,
            JSON.stringify([item], null, 2)
          );

          // Devuelvo el id del nuevo producto y un booleano que indica que salió todo bien
          return {
            id: item.id,
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

  // Método que encuentra un item a partir de un id
  // Devuelve null si no existe un item con ese id
  async getById(id: String) {
    try {
      // Intento leer el archivo, y si existe guardo los datos en un objeto 'info'
      const filePath = path.resolve(__dirname, this.archivo);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const info = JSON.parse(content);

      // Con el método 'find' de array, busco el item que tenga el mismo id que el que se busca
      let item = info.find((e: Producto | Carrito) => e.id == id);

      // Si no lo encuentra, devuelvo objeto con error 'item no encontrado'
      if (item === undefined)
        return {
          error: 'El item buscado no ha sido encontrado',
        };
      else
        return {
          // Devuelvo el item buscado en caso de que el 'find' devuelva un resultado
          success: true,
          item,
        };
    } catch (err: any) {
      // Devuelvo el objeto 'err' si hubo error al leer el archivo
      return {
        success: false,
        msg: err.message,
      };
    }
  }
  // Método para obtener todos los productos
  async getAll() {
    try {
      // Intento leer el archivo
      const filePath = path.resolve(__dirname, this.archivo);

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Transformo la data que llegó en un array de objetos
      const item = JSON.parse(content);

      // Devuelvo el array de objetos
      return {
        success: true,
        item,
      };
    } catch (err: any) {
      // Si hubo un error al leer, devuelvo ese error
      return {
        success: false,
        msg: err.message,
      };
    }
  }
  // Método que elimina un producto con un id determinado
  // No devuelve un resultado
  async deleteById(id: String) {
    const filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id buscado
      // No uso la comparación estricta, por si algún id era numérico en la BD y el req.params lo recibe como string
      const index = info.findIndex((item: Producto | Carrito) => item.id == id);

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
        return {
          success: true,
        };
      } catch (err: any) {
        // Si hubo error al escribir, lo mando a la api
        return {
          success: false,
          msg: err.message,
        };
      }
    } catch (err: any) {
      // Mando un error en caso de que no haya podido leer el archivo
      return {
        success: false,
        msg: err.message,
      };
    }
  }

  // Método que elimina todos los elementos del archivo
  async deleteAll() {
    try {
      // Intento leer el archivo y guardarle un array vacío
      const filePath = path.resolve(__dirname, this.archivo);
      await fs.promises.writeFile(filePath, JSON.stringify([], null, 2));
      return {
        success: true,
      };
    } catch (err: any) {
      // Devuelvo error si hubo al momento de la carga del array vacío en el archivo
      return {
        success: false,
        msg: err.message,
      };
    }
  }
  // Método que actualiza los campos de un item
  async update(item: Producto | Carrito) {
    const filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id del objeto que recibe la función por parámetro
      const index = info.findIndex(
        (elem: Producto | Carrito) => item.id === elem.id
      );

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
        return {
          success: true,
          item,
        };
      } catch (err: any) {
        // Si hubo error al escribir, lo devuelvo a la api
        return {
          success: false,
          msg: err.message,
        };
      }
    } catch (err: any) {
      // Devuelvo error a la api en caso de que no haya podido leer el archivo
      return {
        success: false,
        msg: err.message,
      };
    }
  }
}

// Usaremos el archivo 'products.json' ubicado en la raíz del proyecto para guardar los productos
const productsObj = new Files('../../products.json');

// Usaremos el archivo 'carts.json' ubicado en la raíz del proyecto para guardar los carritos de compra
const cartsObj = new Files('../../carts.json');

export { productsObj, cartsObj };
