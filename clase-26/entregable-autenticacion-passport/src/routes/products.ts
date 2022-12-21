import { Router, Request, Response } from 'express';

// Importo interfaz de producto y controlador para operaciones CRUD con productos
import { Producto } from '../interfaces';
import prodInstance from '../controller/products';

// Importo middleware de autenticación de usuario autorizado
import auth from '../middlewares/auth';

// Importo middleware para validación de datos para carga y edición de productos
import {
  middlewareValidatorInsert,
  middlewareValidatorUpdate,
} from '../middlewares/inputValidation';

// Importo función para saber si se ingresa un ObjectId válido
import { isValidObjectId } from '../utils/tools';

const router = Router();

// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos Método: POST

router.post(
  '/',
  auth,
  middlewareValidatorInsert,
  async (req: any, res: Response) => {
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

      const newProd = await prodInstance.add(newProduct);

      res.status(201).json({
        msg: 'Producto creado con éxito',
        newProd,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id Método: PUT
router.put(
  '/:id',
  auth,
  middlewareValidatorUpdate,
  async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      if (isValidObjectId(id)) {
        // Mando al controller toda la data válida que llega desde el middleware
        const prod = await prodInstance.update(id, req.productData);

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
  }
);

// Devuelvo todos los productos
// Endpoint: /api/productos/:id Método: GET
router.get('/', async (req: Request, res: Response) => {
  try {
    // Traigo todos los productos y los devuelvo en un json
    const products = await prodInstance.getAll();

    if (products) {
      res.json(products);
      // res.render('list', { products });
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
});

// Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const product = await prodInstance.getById(id);

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
});

// // Elimina un producto según su id
// // Endpoint: /api/productos/:id Método: DELETE
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const result = await prodInstance.deleteById(id);

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
});

export default router;
