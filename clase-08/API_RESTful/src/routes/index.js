const { Router } = require('express');
const routerProductos = require('./productos');

const router = Router();

router.use('/productos', routerProductos);

module.exports = router;
