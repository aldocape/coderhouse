// import { productsObj } from './files';
import { Producto } from '../interfaces';
import { mariaDB } from '../services/db';

import SQLClient from '../services/products';

// Instancio la clase, pasando al constructor el objeto con los datos de configuración de mariaDB
// y el nombre de la tabla que va a utilizar
const sql = new SQLClient(mariaDB, 'products');

export const add = async (prod: Producto) => {
  try {
    return await sql.createProduct(prod);
  } catch (error: any) {
    return error.message;
  }
};

export const update = async (prod: Producto) => {
  try {
    return await sql.updateProduct(prod);
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const getById = async (id: string) => {
  try {
    return await sql.listProducts(id);
  } catch (error: any) {
    return error.message;
  }
};

export const getAll = async () => {
  try {
    const products = await sql.listProducts();
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
};

export const deleteById = async (id: string) => {
  try {
    return sql.deleteProduct(id);
  } catch (error: any) {
    return error.message;
  }
};

export const createTableProducts = () => {
  try {
    sql.createTable().then(() => {
      sql.createProductsHardcoded().then(() => {
        console.log('Tabla productos y datos de prueba, creados con éxito!!');
        return;
      });
    });
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};
