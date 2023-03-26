import { model, ObjectId, Schema } from 'mongoose';

import { productsCollection } from './products';

export const cartsCollection = 'cart';

const collection: string = productsCollection;

interface ICart extends Document {
  productos: [
    {
      prodId: ObjectId;
      cantidad: number;
    }
  ];
  direccion_entrega: string;
}

// La estructura del carrito contiene una propiedad llamada 'productos', que es un array de ObjectId de productos
// y también un timestamp que guarda la fecha de creación y de modificación
const cartSchema: Schema = new Schema(
  {
    productos: [
      {
        prodId: {
          type: Schema.Types.ObjectId,
          ref: collection,
          required: true,
        },
        cantidad: { type: Number, require: true },
      },
    ],
    direccion_entrega: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<ICart>(cartsCollection, cartSchema);
