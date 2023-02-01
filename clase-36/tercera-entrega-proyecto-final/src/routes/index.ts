import { Router } from 'express';
import productsRouter from './products';
import cartsRouter from './carts';
import messagesRouter from './messages';
import usersRouter from './users';
import randomsRouter from './random';
import emailRouter from './email';

import loginRouter from './login';

const router = Router();

router.use('/', loginRouter);
router.use('/api/productos', productsRouter);
router.use('/api/carrito', cartsRouter);
router.use('/api/mensajes', messagesRouter);
router.use('/api/usuarios', usersRouter);
router.use('/api/randoms', randomsRouter);
router.use('/api/', emailRouter);

export default router;
