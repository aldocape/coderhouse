import { Router, Response } from 'express';
import { Producto } from '../interfaces';
import moment from 'moment';
import {
  add,
  update,
  getById,
  getAll,
  deleteById,
} from '../controller/products';
import auth from '../middlewares/auth';
import { productValidator } from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos Método: POST
router.post('/', auth, productValidator, async (req: any, res: Response) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.productData;

  const newProduct: Producto = {
    timestamp: moment().format('DD/MM/YYYY hh:mm:ss'),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };

  const newProd = await add(newProduct);

  if (newProd) {
    res.status(201).json({
      msg: 'Producto creado con éxito',
      newProd,
    });
  } else {
    res.status(400).json({
      msg: 'Hubo un error al cargar el nuevo producto',
      newProd,
    });
  }
});

// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id Método: PUT
router.put('/:id', auth, productValidator, async (req: any, res: Response) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

  const modifiedProduct: Producto = {
    id: req.params.id,
    timestamp: moment().format('DD/MM/YYYY hh:mm:ss'),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };

  const prod = await update(modifiedProduct);

  if (prod.success)
    res.json({
      msg: `El producto con id ${req.params.id} fue modificado con éxito`,
      producto: prod.item,
    });
  else {
    res.status(400).json(prod);
  }
});

// Devuelvo todos los productos
// Endpoint: /api/productos/ Método: GET
router.get('/', async (req, res) => {
  // Traigo todos los productos y los devuelvo en un json
  const products = await getAll();

  if (products.success) {
    res.json(products.products);
  } else {
    res.status(400).json({
      msg: products.msg,
    });
  }
});

// Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const result = await getById(id);

  if (result.success) {
    res.json(result);
  } else res.status(401).json(result);
});

// Elimina un producto según su id
// Endpoint: /api/productos/:id Método: DELETE
router.delete('/:id', auth, async (req, res) => {
  const result = await deleteById(req.params.id);

  if (result.success)
    res.json({
      msg: `El producto con id ${req.params.id} ha sido eliminado`,
    });
  else res.status(401).json(result);
});

export default router;
