// Importo estructura de datos y esquema de manejo de base de datos para carrito
import { Carrito } from '../interfaces';
import CartsModel from '../models/carts';

// Clase Carts con persistencia de datos en MongoDB

class Carts {
  // Método 'add' crea un carrito vacío, pero además permite recibir como parámetro un array de productos
  // para tener la posibilidad también de crearlo con algún contenido
  async add(cart: Carrito) {
    const newCart = await CartsModel.create(cart);
    return newCart;
  }

  // Método getById obtiene un carrito por id y además haciendo uso de la función 'populate'
  // traigo los datos de todos los productos contenidos en ese carrito, esto se puede debido a que se
  // encuentra referenciado a la colección de productos
  async getById(id: string) {
    const cart = await CartsModel.findById(id).populate({
      path: 'productos',
    });
    return cart;
  }

  // Método update actualiza un carrito, pasándole dicho carrito por parámetro
  // Con la propiedad new: true, le estamos diciendo que devuelva como resultado el carrito modificado
  async update(id: string, cart: Carrito) {
    const modifiedCart = await CartsModel.findByIdAndUpdate(id, cart, {
      new: true,
    });
    return modifiedCart;
  }

  // // Método delete elimina un carrito por id
  async delete(id: string) {
    const result = await CartsModel.findByIdAndDelete(id);
    return result;
  }
}

const cartInstance = new Carts();

// Exporto una instancia de la clase Carts
export default cartInstance;
