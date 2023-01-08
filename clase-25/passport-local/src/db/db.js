import mongoose from 'mongoose';
import config from '../config/index.js';

export const initDb = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(config.MONGO_ATLAS_URL);
};
