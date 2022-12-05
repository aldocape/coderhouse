import { mariaDB } from './db';
import { Producto } from '../interfaces';

export const listProducts = (id = {}) => {
  return mariaDB('products').select('*').where(id);
};

export const createProduct = (product: Producto) => {
  return mariaDB('products').insert(product);
};

export const updateProduct = (product: Producto) => {
  return mariaDB('products').where('id', product.id).update(product);
};

export const deleteProduct = (id: string) => {
  return mariaDB('products').where('id', id).del();
};
