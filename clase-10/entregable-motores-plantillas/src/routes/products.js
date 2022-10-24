const { Router } = require('express');
const productsController = require('../controller/products');

const router = Router();

// Usaremos el archivo 'products.json' ubicado en la raíz del proyecto
const productObj = new productsController('../../products.json');

const middlewareValidator = (req, res, next) => {
  // Elimino espacios en blanco a los extremos de los campos de texto
  // y en el caso del precio, lo convierto a 'float' para poder cargar números con decimales
  const title = req.body.title.trim();
  const price = parseFloat(req.body.price);
  const thumbnail = req.body.thumbnail.trim();

  // Valido los campos ingresados
  if (isNaN(price)) {
    return res.status(400).json({
      msg: "El tipo de dato ingresado en el campo 'Precio' es inválido, por favor ingrese un número con o sin decimales",
    });
  }
  if (!title || !price || !thumbnail) {
    return res.status(400).json({
      msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el form',
    });
  }
  next();
};

router.post('/', middlewareValidator, (req, res) => {
  // Armo un objeto con los campos ingresados por el usuario
  const newProduct = {
    title,
    price,
    thumbnail,
  };
  // Luego de cargar el producto en el archivo, llamo al método getAll() para
  // traer el listado completo y mostrarlo, con la plantilla 'list'
  productObj.save(newProduct).then((result) => {
    productObj.getAll().then((products) => {
      res.render('list', { products });
    });
  });
});

router.get('/', (req, res) => {
  // Traigo todos los productos y los muestro pasando el objeto en la plantilla 'list'
  productObj.getAll().then((products) => {
    res.render('list', { products });
  });
});

module.exports = router;
