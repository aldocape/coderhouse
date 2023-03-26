import {
  saveProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct,
} from '../services/products.services';
import { Request, Response } from 'express';

export const saveController = async (req: any, res: Response) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } =
      req.productData;

    const newProduct: any = {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };

    const newProd = await saveProduct(newProduct);

    res.status(201).json({
      msg: 'Producto creado con éxito',
      newProd,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    if (products) {
      res.json(products);
    } else {
      res.status(400).json({
        msg: 'Hubo un error al obtener los productos',
      });
    }
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getProdByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (product) res.json(product);
    else
      res.status(404).json({
        msg: 'El producto no ha sido encontrado',
      });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const deleteProdByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteProductById(id);

    if (result)
      res.json({
        msg: `El producto con id "${id}" ha sido eliminado`,
      });
    else
      res.json({
        msg: 'El producto con el id seleccionado no existe',
      });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const updateProdController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    // Mando a la función toda la data válida que llega desde el middleware
    const prod = await updateProduct(id, req.productData);
    res.json(prod);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
};
