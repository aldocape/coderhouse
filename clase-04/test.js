const contenedor = require('./claseContenedor');

// Creo un objeto 'tienda' a partir de la clase Contenedor, y le paso
// el nombre de archivo 'products.txt' donde se irán agregando o quitando

const tienda = new contenedor('products.txt');

// Creo tres objetos para probar la carga de productos

const producto1 = {
  title: 'Escuadra',
  price: 123.45,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
};

const producto2 = {
  title: 'Calculadora',
  price: 234.56,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
};

const producto3 = {
  title: 'Globo Terráqueo',
  price: 345.67,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
};

// Funciones asincrónicas para el test de los métodos de la clase Contenedor

async function cargarProducto(producto) {
  try {
    const id = await tienda.save(producto);
    console.log(`El id del nuevo producto ingresado es: ${id}`);
  } catch (err) {
    console.log(err);
  }
}

async function obtenerPorId(id) {
  try {
    const producto = await tienda.getById(id);
    if (producto) {
      console.log(
        `Los datos del producto buscado son los siguientes: \n Id: ${producto.id} \n Título: ${producto.title} \n Precio: ${producto.price} \n Icono: ${producto.thumbnail}`
      );
    } else {
      console.log(
        'El producto con el id ingresado no existe en nuestra base de datos'
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function obtenerTodos() {
  try {
    const datos = await tienda.getAll();
    console.log(
      `Los datos de todos los productos del archivo son los siguientes: `
    );
    datos.forEach((product) => {
      console.log(
        `Id: ${product.id} \n Título: ${product.title} \n Precio: ${product.price} \n Thumbnail: ${product.thumbnail}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

// Usando el método then de la Promise, cargo 3 productos de una sola vez, siempre
// agregando cada uno después de que la carga del anterior haya terminado

// cargarProducto(producto1).then(() =>
//   cargarProducto(producto2).then(() => cargarProducto(producto3))
// );

// Test de funciones obtener por id y obtener todos

// obtenerPorId(2);

obtenerTodos();

// Métodos eliminar por id y eliminar todo

// tienda.deleteById(2);

// tienda.deleteAll();
