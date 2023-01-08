import mongoose from 'mongoose';
import Config from '../config/index.js';

export const initDb = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(Config.MONGO_ATLAS_URL);
};
