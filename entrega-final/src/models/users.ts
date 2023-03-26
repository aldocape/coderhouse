import { model, ObjectId, Schema } from 'mongoose';
import { cartsCollection } from './carts';

import bcrypt from 'bcryptjs';

const usersCollection = 'user';

const collection: string = cartsCollection;

interface IUser extends Document {
  username: string;
  password: string;
  admin: boolean;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  avatar: string;
  carrito: ObjectId;
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: Boolean, require: false, default: false },
    nombre: { type: String, require: true },
    direccion: { type: String, require: true },
    edad: { type: Number, require: false },
    telefono: { type: String, require: false },
    avatar: { type: String, require: false },
    carrito: { type: Schema.Types.ObjectId, ref: collection, required: false },
  },
  { timestamps: false, versionKey: false }
);

userSchema.method('encryptPassword', async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
});

userSchema.method('matchPassword', async function (password) {
  return await bcrypt.compare(password, this.password);
});

export default model<IUser>(usersCollection, userSchema);
