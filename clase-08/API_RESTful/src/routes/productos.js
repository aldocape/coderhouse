const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const routerProductos = Router();

// Importo los métodos de la clase Contenedor
const contenedor = require('../claseContenedor');

// Creo un objeto tienda a partir de la clase contenedor
// Asignando '../products.txt' como nombre de archivo porque está un nivel hacia arriba
const tienda = new contenedor('../products.txt');

// Consignas

// Ejercicio 1: Devuelvo todos los productos
// Endpoint: /api/productos/:id Método: GET
routerProductos.get('/', async (req, res) => {
  const productos = await tienda.getAll();
  // Muestra todos los productos, o el error en formato json si algo falló
  res.json(productos);
});

// Ejercicio 2: Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
routerProductos.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await tienda.getById(id);

  // Si hubo éxito al encontrar el producto, lo muestro en json
  if (result.success) res.json(result.product);
  // Si hubo un error al leer, lo muestro en formato json
  else res.json(result);
});

// Ejercicio 3: Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos Método: POST
routerProductos.post('/', async (req, res) => {
  const productoNuevo = {
    // Uso la la librería uuid para crear un id aleatorio que no se repita
    // y traigo con req.body los datos que llegan desde el frontend
    id: uuidv4(),
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };

  const result = await tienda.save(productoNuevo);

  if (result.success) {
    res.status(201).json({
      msg: 'Producto creado con éxito',
      productoNuevo,
    });
  } else {
    res.json({
      msg: 'Hubo un error al cargar el nuevo producto',
      result,
    });
  }
});

// Ejercicio 4: Recibe y actualiza un producto, según su id
// Endpoint: /api/productos/:id Método: PUT
routerProductos.put('/:id', async (req, res) => {
  const productoModificado = {
    id: req.params.id,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };

  const result = await tienda.update(productoModificado);

  if (result.success)
    res.json({
      msg: `El producto con id ${req.params.id} fue modificado con éxito`,
      producto: result.producto,
    });
  else {
    res.json(result);
  }
});

// Ejercicio 5: Elimina un producto según su id
// Endpoint: /api/productos/:id Método: DELETE
routerProductos.delete('/:id', async (req, res) => {
  const result = await tienda.deleteById(req.params.id);

  if (result.success)
    res.json({
      msg: `El producto con id ${req.params.id} ha sido eliminado`,
    });
  else res.json(result);
});

module.exports = routerProductos;
