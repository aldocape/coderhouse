import { productsObj } from './files';
import { Producto } from '../interfaces';

// Lógica de negocio/api para el manejo de Productos
class Products {
  // Método 'add' agrega un producto a la lista, o en caso que no exista ninguno, crea el archivo y el carrito
  async add(prod: Producto) {
    const newProduct = await productsObj.saveItem(prod);
    return newProduct;
  }

  // Método update actualiza un producto, pasándole dicho producto por parámetro
  async update(prod: Producto) {
    const modifiedProduct = await productsObj.update(prod);
    return modifiedProduct;
  }

  // Método getById obtiene un producto por id
  async getById(id: string) {
    const product = await productsObj.getById(id);
    return product;
  }

  // Método getAll obtiene todos los productos
  async getAll() {
    const products = await productsObj.getAll();
    return products;
  }

  // Método deleteById elimina un producto por id
  async deleteById(id: string) {
    const result = await productsObj.deleteById(id);
    return result;
  }
}

const prodInstance = new Products();

// Exporto una instancia de la clase Products
export default prodInstance;
