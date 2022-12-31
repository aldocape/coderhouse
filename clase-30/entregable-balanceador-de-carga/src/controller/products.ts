// Importo estructura de datos y esquema de manejo de base de datos para productos
import { Producto } from '../interfaces';
import ProductsModel from '../models/products';

// Clase Products con persistencia de datos en MongoDB

class Products {
  // Método getAll obtiene todos los productos
  async getAll() {
    const products = await ProductsModel.find();
    return products;
  }

  // Método getById obtiene un producto por id
  async getById(id: string) {
    const product = await ProductsModel.findById(id);
    return product;
  }

  // Método 'add' agrega un documento de tipo producto a la colección 'products'
  async add(product: Producto) {
    const newProduct = await ProductsModel.create(product);
    return newProduct;
  }

  // Método deleteById elimina un producto por id
  async deleteById(id: string) {
    const product = await ProductsModel.findByIdAndDelete(id);
    return product;
  }

  // Método update actualiza un producto, recibe dos variables por parámetro: el id y el producto modificado
  // Con la propiedad new: true, le estamos diciendo que devuelva como resultado el producto modificado
  async update(id: string, product: any) {
    // Actualizo el documento usando `updateOne()`
    await ProductsModel.updateOne({ _id: id }, product);

    // Cargo el documento para ver los nuevos valores
    const updatedProduct = await ProductsModel.findOne();

    return updatedProduct;
  }
}

const prodInstance = new Products();

// Exporto una instancia de la clase Products
export default prodInstance;
