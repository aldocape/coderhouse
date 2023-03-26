import { Router, Request, Response } from 'express';
import axios from 'axios';

import productsRouter from './products.routes';
import cartsRouter from './carts.routes';
import usersRouter from './users.routes';
import messagesRouter from './messages.routes';
import ordersRouter from './orders.routes';
import infoRouter from './info.routes';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const response: any = await axios.get('/api/productos');
  const productos = response.data;
  res.render('index', { productos });
});

router.use('/', usersRouter);
router.use('/info', infoRouter);
router.use('/api/productos', productsRouter);
router.use('/api/mensajes', messagesRouter);
router.use('/api/carrito', cartsRouter);
router.use('/api/ordenes', ordersRouter);

export default router;
