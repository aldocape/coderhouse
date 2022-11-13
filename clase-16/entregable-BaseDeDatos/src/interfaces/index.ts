// Definición de estructuras de datos

interface Producto {
  id?: string;
  timestamp: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}
interface Mensaje {
  id?: string;
  time: string;
  text: string;
  user: string;
}

export { Producto, Mensaje };
