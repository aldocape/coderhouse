import { Router, Request, Response, NextFunction } from 'express';
import { Carrito, Producto } from '../interfaces';
import moment from 'moment';
import cartInstance from '../controller/carts';
import prodInstance from '../controller/products';

const router = Router();

// Recibe un producto por body y crea un carrito, y lo devuelve con su id asignado
// Endpoint: /api/carrito Método: POST
router.post('/', async (req: Request, res: Response) => {
  const timestamp = moment().format('DD/MM/YYYY hh:mm:ss');

  const cart: Carrito = {
    timestamp,
    productos: [],
    // productos: [producto],
  };

  const newCart = await cartInstance.add(cart);

  if (newCart.success) {
    res.status(201).json({
      msg: 'Carrito creado con éxito',
      newCart,
    });
  } else {
    res.json({
      msg: 'Hubo un error al cargar el carrito',
      newCart,
    });
  }
});

// Me permite listar todos los productos guardados en el carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', async (req, res) => {
  const id = req.params.id;

  const result = await cartInstance.getById(id);

  if (result.success) {
    res.json(result.item.productos);
  } else res.status(401).json(result);
});

// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', async (req, res) => {
  const result = await cartInstance.delete(req.params.id);

  if (result.success)
    res.json({
      msg: `El carrito con id ${req.params.id} ha sido eliminado`,
    });
  else res.json(result);
});

// Permite incorporar productos al carrito por id de producto
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', async (req: Request, res: Response) => {
  // const { title, price, thumbnail, msg, success } = req;

  const productId = req.body.productId;

  // Busco el producto en la DB
  const product = await prodInstance.getById(productId);

  if (!product.success) {
    res.status(400).json({
      msg: `No existe el producto con id: ${productId}`,
    });
  } else {
    // Busco el carrito en la DB
    const productsCart = await cartInstance.getById(req.params.id);

    if (!productsCart.success) {
      res.status(400).json({
        msg: `No existe el carrito con id: ${req.params.id}`,
      });
    } else {
      // Si existe el carrito y el producto, agrego el producto al array de productos del carrito
      productsCart.item.productos.push(product.item);

      const updatedCart = await cartInstance.update(productsCart.item);

      if (updatedCart.success) {
        res.json({
          success: true,
          msg: `El producto con id ${productId} ha sido agregado al carrito seleccionado`,
          carritoActualizado: updatedCart.item,
        });
      } else {
        res.status(400).json({
          msg: 'Hubo un error al intentar actualizar el carrito',
        });
      }
    }
  }
});

// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete('/:id/productos/:id_prod', async (req, res) => {
  //Obtengo el carrito desde la DB
  const productsCart = await cartInstance.getById(req.params.id);

  // Si el carrito no existe en la DB, mando un error
  if (!productsCart.success) {
    res.status(400).json({
      msg: 'No existe ningún carrito con el id proporcionado',
    });
  } else {
    // Si el carrito existe, busco el producto
    const index = productsCart.item.productos.findIndex(
      (prod: Producto) => prod.id == req.params.id_prod
    );

    // Si index = -1, el producto con ese id no existe, devuelvo un error
    if (index < 0) {
      res.status(400).json({
        msg: 'El id de producto seleccionado no existe en el carrito',
      });
    } else {
      // Si el producto buscado existe, lo elimino en el array de productos con el método 'splice'
      productsCart.item.productos.splice(index, 1);

      // Actualizo el carrito en la BD
      const updatedCart = await cartInstance.update(productsCart.item);

      // Si salió todo bien muestro carrito actualizado, sino muestro un error
      if (updatedCart.success) {
        res.json({
          success: true,
          msg: `El producto con id ${req.params.id_prod} ha sido eliminado con éxito del carrito seleccionado`,
          carritoActualizado: updatedCart.item,
        });
      } else {
        res.status(400).json({
          msg: 'Hubo un error al intentar actualizar el carrito',
        });
      }
    }
  }
});

export default router;
