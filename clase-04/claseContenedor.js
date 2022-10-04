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
    try {
      // Intento leer el archivo cuyo nombre pasé al constructor
      const content = await fs.promises.readFile(
        __dirname + '/' + this.archivo,
        'utf8'
      );

      // Si salió todo bien, o sea, no se va al catch, entonces almaceno los datos como objeto
      const products = JSON.parse(content);

      // Almaceno el mayor id en una constante 'max'
      const max = products[products.length - 1].id;

      // Asigno al nuevo producto el valor del máximo id + 1
      obj.id = max + 1;

      // Agrego al array el nuevo producto
      products.push(obj);

      try {
        // Intento escribir en el archivo, con los nuevos datos
        await fs.promises.writeFile(
          __dirname + '/' + this.archivo,
          JSON.stringify(products, null, 2)
        );
        console.log('El producto ha sido agregado!!');

        // Devuelvo el id del nuevo producto
        return obj.id;
      } catch (err) {
        // Si hubo un error al escribir, lo muestro
        console.log('Error al cargar datos en el archivo');
      }
    } catch (err) {
      // Este catch viene desde el primer try, significa que si entró aquí,
      // o bien no existe el archivo, o bien tiene algún error al leerlo
      // Para el caso que no exista, lo verifico con el código 'ENOENT'
      if (err.code === 'ENOENT') {
        try {
          // El archivo no existe, significa que es el primer producto, con id = 1
          obj.id = 1;
          // Guardo en un array el producto, y lo escribo en el archivo
          await fs.promises.writeFile(
            __dirname + '/' + this.archivo,
            JSON.stringify([obj], null, 2)
          );
          console.log('El producto ha sido agregado!!');
          // Devuelvo el id del producto ingresado
          return obj.id;
        } catch (err) {
          // Si hubo un error al escribir en el archivo, lo muestro por consola
          console.log(err.message);
        }
      } else {
        // Muestro por consola si llega a haber algún error distinto al 'ENOENT'
        console.log(err.message);
      }
    }
  }
  // Método que encuentra un producto a partir de un id
  // Devuelve null si no existe un producto con ese id
  async getById(id) {
    try {
      // Intento leer el archivo, y si existe guardo los datos en un objeto 'info'
      const content = await fs.promises.readFile(
        __dirname + '/' + this.archivo,
        'utf8'
      );
      const info = JSON.parse(content);

      // Con el método 'find' de array, busco el producto que tenga el mismo id que el que se busca
      let product = info.find((e) => e.id == id);

      // Si no lo encuentra, asigno null, para que cumpla la consigna y no devuelva undefined
      if (product === undefined) product = null;
      // Devuelvo un producto o null en caso de que no exista
      return product;
    } catch (err) {
      // Muestro por consola si hubo error al leer el archivo
      console.log(err.message);
    }
  }
  // Método para obtener todos los productos
  async getAll() {
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(
        __dirname + '/' + this.archivo,
        'utf8'
      );
      // Transformo la data que llegó en un array de objetos
      const info = JSON.parse(content);
      // Devuelvo el array de objetos
      return info;
    } catch (err) {
      // Muestro por consola si hubo un error al leer el archivo
      console.log(err.message);
    }
  }
  // Método que elimina un producto con un id determinado
  // No devuelve un resultado
  async deleteById(id) {
    try {
      // Intento leer el archivo
      const content = await fs.promises.readFile(
        __dirname + '/' + this.archivo,
        'utf8'
      );
      // Guardo el contenido en un array de objetos
      const info = JSON.parse(content);

      // Con el método findIndex, verifico si existe algún producto con el id buscado
      const index = info.findIndex((prod) => prod.id === id);

      // Si index = -1, el producto con ese id no existe
      if (index < 0) {
        console.log(
          'El producto con id ingresado no existe en la base de datos'
        );
        return;
      }

      // Si el producto buscado existe, lo elimino en el array con el método 'splice'
      info.splice(index, 1);

      try {
        // Intento escribir los datos del nuevo array en el archivo
        await fs.promises.writeFile(
          __dirname + '/' + this.archivo,
          JSON.stringify(info, null, 2)
        );
        console.log('El producto ha sido eliminado!!');
      } catch (err) {
        // Si hubo error al escribir, lo muestro por consola
        console.log('Error al cargar datos en el archivo');
      }
    } catch (err) {
      // Muestro un error en caso de que no haya podido leer el archivo
      console.log(err.message);
    }
  }
  // Método que elimina todos los productos del archivo
  // No devuelve un resultado
  async deleteAll() {
    try {
      // Intento leer el archivo y guardarle un array vacío
      await fs.promises.writeFile(
        __dirname + '/' + this.archivo,
        JSON.stringify([], null, 2)
      );
      console.log('Todos los productos fueron eliminados!!');
    } catch (err) {
      // Muestro por consola si hubo error para la carga del array vacío en el archivo
      console.log('Error al cargar datos en el archivo');
    }
  }
}

module.exports = Contenedor;
