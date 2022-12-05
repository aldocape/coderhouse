// import { productsObj } from './files';
import { Producto } from '../interfaces';

// Lógica de negocio/api para el manejo de Productos

import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products';

class Products {
  // Método 'add' agrega un producto a la lista, o en caso que no exista ninguno, crea el archivo y el carrito
  async add(prod: Producto) {
    try {
      const newProduct = await createProduct(prod);
      return newProduct;
    } catch (error: any) {
      return error.message;
    }
  }

  // // Método update actualiza un producto, pasándole dicho producto por parámetro
  async update(prod: Producto) {
    try {
      const modifiedProduct = await updateProduct(prod);
      return modifiedProduct;
    } catch (error: any) {
      return error.message;
    }
  }

  // // Método getById obtiene un producto por id
  async getById(id: string) {
    try {
      const product = await listProducts(id);
      return product;
    } catch (error: any) {
      return error.message;
    }
  }

  // Método getAll obtiene todos los productos
  async getAll() {
    try {
      const products = await listProducts();
      return {
        success: true,
        products,
      };
    } catch (error: any) {
      return {
        success: false,
        msg: error.message,
      };
    }
  }

  // // Método deleteById elimina un producto por id
  async deleteById(id: string) {
    try {
      const result = await deleteProduct(id);
      return result;
    } catch (error: any) {
      return error.message;
    }
  }
}

const prodInstance = new Products();

// Exporto una instancia de la clase Products
export default prodInstance;
