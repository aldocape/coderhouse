import { Router } from 'express';
import productsRouter from './products';
import messagesRouter from './messages';

const router = Router();

router.use('/productos', productsRouter);
router.use('/mensajes', messagesRouter);

export default router;
