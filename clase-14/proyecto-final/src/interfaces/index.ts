// Definición de estructuras de datos

interface Producto {
  id?: String;
  timestamp: String;
  nombre: String;
  descripcion?: String;
  codigo: String;
  foto?: String;
  precio: Number;
  stock: Number;
}

interface Carrito {
  id?: String;
  timestamp: String;
  productos?: [Producto?];
}

export { Producto, Carrito };
