const fs = require('fs');
const path = require('path');

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  // Métodos de la clase Contenedor

  // Método 'save' agrega un producto por primera vez con id = 1
  // o en caso contrario le asigna id = último id + 1

  async save(obj) {
    let filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor

      const content = await fs.promises.readFile(filePath, 'utf8');

      // Si salió todo bien, o sea, no se va al catch, entonces almaceno los datos como objeto
      const products = JSON.parse(content);

      // Agrego al array el nuevo producto
      products.push(obj);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(products, null, 2)
        );

        // Devuelvo el id del nuevo producto y un booleano que indica que salió todo bien
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
          // El archivo no existe, significa que es el primer producto
          // Guardo en un array el producto, y lo escribo en el archivo
          await fs.promises.writeFile(filePath, JSON.stringify([obj], null, 2));

          // Devuelvo el id del nuevo producto y un booleano que indica que salió todo bien
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
  // Método que encuentra un producto a partir de un id
  // Devuelve null si no existe un producto con ese id
  async getById(id) {
    try {
      // Intento leer el archivo, y si existe guardo los datos en un objeto 'info'
      let filePath = path.resolve(__dirname, this.archivo);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const info = JSON.parse(content);

      // Con el método 'find' de array, busco el producto que tenga el mismo id que el que se busca
      let product = info.find((e) => e.id == id);

      // Si no lo encuentra, devuelvo objeto con error 'producto no encontrado'
      if (product === undefined)
        return {
          error: 'Producto no encontrado',
        };
      else
        return {
          // Devuelvo el producto en caso de que el 'find' devuelva un resultado
          success: true,
          product,
        };
    } catch (err) {
      // Devuelvo el objeto 'err' si hubo error al leer el archivo
      return {
        success: false,
        err,
      };
    }
  }
  // Método para obtener todos los productos
  async getAll() {
    try {
      // Intento leer el archivo
      let filePath = path.resolve(__dirname, this.archivo);
      const content = await fs.promises.readFile(filePath, 'utf8');
      // Transformo la data que llegó en un array de objetos
      const info = JSON.parse(content);
      // Devuelvo el array de objetos
      return {
        success: true,
        products: info,
      };
    } catch (err) {
      // Si hubo un error al leer, devuelvo ese error
      return {
        success: false,
        err,
      };
    }
  }
  // Método que elimina un producto con un id determinado
  // No devuelve un resultado
  async deleteById(id) {
    let filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id buscado
      // No uso la comparación estricta, por si algún id era numérico en la BD y el req.params lo recibe como string
      const index = info.findIndex((prod) => prod.id == id);

      // Si index = -1, el producto con ese id no existe
      if (index < 0) {
        return {
          error: 'Producto no encontrado',
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
      } catch (err) {
        // Si hubo error al escribir, lo mando a la api
        return {
          success: false,
          err,
        };
      }
    } catch (err) {
      // Mando un error en caso de que no haya podido leer el archivo
      return {
        success: false,
        err,
      };
    }
  }

  // Método que elimina todos los productos del archivo
  async deleteAll() {
    try {
      // Intento leer el archivo y guardarle un array vacío
      let filePath = path.resolve(__dirname, this.archivo);
      await fs.promises.writeFile(filePath, JSON.stringify([], null, 2));
      return {
        success: true,
      };
    } catch (err) {
      // Devuelvo error si hubo al momento de la carga del array vacío en el archivo
      return {
        success: false,
        err,
      };
    }
  }
  // Método que actualiza los campos de un producto
  async update(obj) {
    let filePath = path.resolve(__dirname, this.archivo);
    try {
      // Intento leer el archivo

      const content = await fs.promises.readFile(filePath, 'utf8');
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id del objeto que recibe la función por parámetro
      const index = info.findIndex((prod) => prod.id === obj.id);

      // Si index = -1, el producto con ese id no existe
      if (index < 0) {
        return {
          error: 'Producto no encontrado',
        };
      }

      // Si el producto buscado existe, lo reemplazo con el nuevo que viene por parámetro
      info.splice(index, 1, obj);

      try {
        // Intento escribir los datos del nuevo array en el archivo
        await fs.promises.writeFile(filePath, JSON.stringify(info, null, 2));
        return {
          success: true,
          producto: obj,
        };
      } catch (err) {
        // Si hubo error al escribir, lo devuelvo a la api
        return {
          success: false,
          err,
        };
      }
    } catch (err) {
      // Devuelvo error a la api en caso de que no haya podido leer el archivo
      return {
        success: false,
        err,
      };
    }
  }
}

module.exports = Contenedor;
