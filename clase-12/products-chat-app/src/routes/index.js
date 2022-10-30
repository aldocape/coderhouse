const { Router } = require('express');
const productsRouter = require('./products');
const messagesRouter = require('./messages');
const router = Router();

router.use('/productos', productsRouter);
router.use('/mensajes', messagesRouter);

module.exports = router;
