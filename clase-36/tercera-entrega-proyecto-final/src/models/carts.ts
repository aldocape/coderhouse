import { model, Schema } from 'mongoose';

import { productsCollection } from './products';

export const cartsCollection = 'cart';

const collection: string = productsCollection;

// La estructura del carrito contiene una propiedad llamada 'productos', que es un array de ObjectId de productos
// y también un timestamp que guarda la fecha de creación y de modificación
const cartSchema: Schema = new Schema(
  {
    productos: [
      {
        type: Schema.Types.ObjectId,
        ref: collection,
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default model(cartsCollection, cartSchema);
