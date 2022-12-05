import mongoose from 'mongoose';

export const usersCollection = 'usuario';

export interface IUser {
  name: string;
  username: string;
  password: string;
  admin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, max: 100 },
    username: { type: String, require: true, max: 100 },
    password: { type: String, require: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>(usersCollection, userSchema);
