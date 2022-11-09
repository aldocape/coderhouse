import { cartsObj } from './files';
import { Carrito } from '../interfaces';

// Lógica de negocio/api para el manejo de Carritos
class Carts {
  // Método 'save' agrega un carrito a la lista, o en caso que no exista ninguno, crea el archivo y el carrito
  async add(cart: Carrito) {
    const newCart = await cartsObj.saveItem(cart);
    return newCart;
  }

  // Método getById obtiene un carrito por id
  async getById(id: string) {
    const cart = await cartsObj.getById(id);
    return cart;
  }

  // Método update actualiza un carrito, pasándole dicho carrito por parámetro
  async update(cart: Carrito) {
    const modifiedCart = await cartsObj.update(cart);
    return modifiedCart;
  }

  // Método delete elimina un carrito por id
  async delete(id: string) {
    const result = await cartsObj.deleteById(id);
    return result;
  }
}

const cartInstance = new Carts();

// Exporto una instancia de la clase Carts
export default cartInstance;
