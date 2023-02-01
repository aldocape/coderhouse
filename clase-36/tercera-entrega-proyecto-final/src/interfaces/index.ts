// Definición de estructuras de datos

interface Producto {
  nombre: string;
  descripcion?: string;
  codigo: string;
  foto?: string;
  precio: number;
  stock: number;
}

// Carrito es un array de ObjectId de productos
interface Carrito {
  productos: [any?];
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

interface Usuario {
  username: string;
  password: string;
  admin: boolean;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
  carrito?: any;
}

export { Producto, Carrito, Mensaje, Usuario };
