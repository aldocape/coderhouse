import {
  saveProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct,
} from '../services/products.services';
import { Request, Response } from 'express';
import { Producto } from '../interfaces';

// Importo función para saber si se ingresa un ObjectId válido
import { isValidObjectId } from '../utils/tools';

export const saveController = async (req: any, res: Response) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } =
      req.productData;

    const newProduct: Producto = {
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
    res.status(500).json({
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
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getProdByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const product = await getProductById(id);

      if (!product)
        res.status(404).json({
          msg: 'El producto no ha sido encontrado',
        });

      res.json(product);
    } else {
      res.status(500).json({
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteProdByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const result = await deleteProductById(id);

      if (result)
        res.json({
          msg: `El producto con id "${id}" ha sido eliminado`,
        });
      else
        res.json({
          msg: 'El producto con el id seleccionado no existe',
        });
    } else {
      res.status(500).json({
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateProdController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      // Mando a la función toda la data válida que llega desde el middleware
      const prod = await updateProduct(id, req.productData);
      res.json(prod);
    } else {
      res.status(500).json({
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};
