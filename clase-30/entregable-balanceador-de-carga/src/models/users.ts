import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const usersCollection = 'user';

const userSchema: Schema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: Boolean, require: false },
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
