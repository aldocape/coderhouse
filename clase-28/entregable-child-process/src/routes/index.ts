import { Router } from 'express';
import productsRouter from './products';
import cartsRouter from './carts';
import messagesRouter from './messages';
import randomsRouter from './random';

const router = Router();

router.use('/productos', productsRouter);
router.use('/carrito', cartsRouter);
router.use('/mensajes', messagesRouter);

router.use('/randoms', randomsRouter);

export default router;
