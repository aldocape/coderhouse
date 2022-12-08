import { Router } from 'express';

import messagesRouter from './messages';

import { getWithFaker } from '../controller/products';

const router = Router();

router.use('/mensajes', messagesRouter);

router.use('/productos-test', (req, res) => {
  const products = getWithFaker();
  if (products.success) {
    res.json(products.products);
  } else {
    res.status(400).json({
      msg: products.msg,
    });
  }
});

export default router;
