// Importo la librería express
const express = require('express');

// Importo los métodos de la clase Contenedor
const contenedor = require('./claseContenedor');

const app = express();

const PORT = 8080;

// Creo un objeto tienda a partir de la clase contenedor
// Asignando '../products.txt' como nombre de archivo porque está un nivel hacia arriba
const tienda = new contenedor('../products.txt');

// Consignas

// Ejercicio 1: Devuelvo todos los productos desde el endpoint /productos
app.get('/productos', async (req, res) => {
  const productos = await tienda.getAll();
  res.json(productos);
});

//Ejercicio 2: Devuelvo un producto al azar entre todos los disponibles
app.get('/productoRandom', async (req, res) => {
  // Obtengo todos los productos almacenados en el archivo con el método getAll()
  const productos = await tienda.getAll();

  // Elijo un índice del array al azar, usando la función de javascript Math.random()
  // Debido a que Math.random() devuelve un valor entre 0 y 1, lo multiplico por productos.length,
  // para que el valor resultante esté comprendido entre 0 y la cantidad de objetos del array
  // Luego le aplico Math.floor para redondear ese valor para que sea un entero
  const index = Math.floor(Math.random() * productos.length);

  // Devuelvo el objeto contenido en productos[index]
  res.json(productos[index]);
});

// Inicializo el servidor en el puerto seleccionado
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server.on('error', (error) => console.log(`Error en servidor ${error}`));
