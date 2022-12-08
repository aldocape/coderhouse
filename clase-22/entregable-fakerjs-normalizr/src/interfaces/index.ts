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
  time: string;
  text: string;
  author: {
    email: string; // Sería el id del autor del mensaje, es único y lo identifica, no se repite
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
  };
}

export { Producto, Mensaje };
