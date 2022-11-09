import { Router } from 'express';
import productsRouter from './products';
import cartsRouter from './carts';

const router = Router();

router.use('/productos', productsRouter);
router.use('/carrito', cartsRouter);

export default router;
