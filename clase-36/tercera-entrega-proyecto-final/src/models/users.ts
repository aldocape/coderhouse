import { model, Schema } from 'mongoose';
import { cartsCollection } from './carts';

import bcrypt from 'bcryptjs';

const usersCollection = 'user';

const collection: string = cartsCollection;

const userSchema: Schema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: Boolean, require: false },
    nombre: { type: String, require: true },
    direccion: { type: String, require: true },
    edad: { type: Number, require: true },
    telefono: { type: String, require: true },
    avatar: { type: String, require: true },
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

export default model(usersCollection, userSchema);
