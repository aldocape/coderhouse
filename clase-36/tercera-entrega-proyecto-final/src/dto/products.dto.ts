import { Producto } from '../interfaces';

export default class ProductsDTO {
  id: string;
  nombre: string;
  descripcion?: string;
  foto?: string;
  precioARS: number;
  precioUSD: string;
  hasStock: boolean;
  stock: number;

  constructor(data: Producto) {
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.foto = data.foto;
    this.precioARS = data.precio;
    this.precioUSD = (data.precio / 377).toFixed(2);
    this.hasStock = data.stock > 0;
    this.stock = data.stock;
    this.id = data._id || '';
  }
}
