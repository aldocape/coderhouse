import {
  save,
  getAll,
  getById,
  deleteById,
  update,
} from '../persistence/persistence';
import { Producto } from '../interfaces';

export async function saveProduct(product: Producto) {
  const prod = await save('product', product);
  return prod;
}

export async function getAllProducts() {
  const products = await getAll('product');
  return products;
}

export async function getProductById(id: string) {
  const product = await getById('product', id);
  return product;
}

export async function deleteProductById(id: string) {
  const product = await deleteById('product', id);
  return product;
}

export async function updateProduct(id: string, product: Producto) {
  const productModified = await update('product', id, product);
  return productModified;
}
