import { model, Schema } from 'mongoose';
import { Estado } from '../interfaces';

export const ordersCollection = 'order';

import { productsCollection } from './products';

const collection: string = productsCollection;

interface IOrder extends Document {
  userId: string;
  estado: Estado;
  items: [
    {
      prodId: string;
      cantidad: number;
      precio: number;
    }
  ];
}

const orderSchema: Schema = new Schema(
  {
    items: [
      {
        prodId: {
          type: Schema.Types.ObjectId,
          ref: collection,
          required: true,
        },
        cantidad: { type: Number, require: true },
        precio: { type: Number, require: true },
      },
    ],
    userId: { type: String, require: true },
    estado: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IOrder>(ordersCollection, orderSchema);
