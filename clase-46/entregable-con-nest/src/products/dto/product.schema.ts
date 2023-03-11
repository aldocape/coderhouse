import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  codigo: string;

  @Prop({ type: String, required: true })
  foto: string;

  @Prop({ type: Number, required: true })
  precio: number;

  @Prop({ type: Number, required: true })
  stock: number;
}

export const ProductCollectioName = Product.name;
export const ProductSchema = SchemaFactory.createForClass(Product);
