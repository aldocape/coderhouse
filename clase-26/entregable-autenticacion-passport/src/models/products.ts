import { model, Schema, Document } from 'mongoose';

// Exporto el nombre de la colección para usarla en el modelo de carrito
// De esta manera, si después cambia el nombre, se referencia automáticamente a la nueva colección
export const productsCollection = 'product';

interface IProduct extends Document {
  nombre: string;
  descripcion?: string;
  codigo: string;
  foto?: string;
  precio: number;
  stock: number;
}

const ProductSchema: Schema = new Schema(
  {
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, max: 400 },
    codigo: { type: String, require: true, max: 50 },
    foto: { type: String, max: 300 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IProduct>(productsCollection, ProductSchema);
