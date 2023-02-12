// Definición de estructuras de datos

import { ObjectId } from 'mongoose';

export interface Producto {
  _id: string;
  nombre: string;
  descripcion?: string;
  codigo: string;
  foto?: string;
  precio: number;
  stock: number;
}

// Carrito es un array de ObjectId de productos
export interface Carrito {
  productos: [any?];
}

export interface Mensaje {
  _id: string;
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

export interface Usuario {
  _id: string;
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
