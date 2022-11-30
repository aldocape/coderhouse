// Definición de estructuras de datos

interface Producto {
  nombre: String;
  descripcion?: String;
  codigo: String;
  foto?: String;
  precio: Number;
  stock: Number;
}

// Carrito es un array de ObjectId de productos
interface Carrito {
  productos: [any?];
}

export { Producto, Carrito };
