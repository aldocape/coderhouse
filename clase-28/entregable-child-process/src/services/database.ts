import mongoose from 'mongoose';
import config from '../config';

const connectionString = config.MONGO_ATLAS_URL;

// Conexión a la BD de Mongo
(async () => {
  try {
    console.log('Connecting...');
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(connectionString);

    console.log('Database is connected to:', db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();

export const disconnectMongo = async () => {
  try {
    console.log('Disconnecting from database...');
    await mongoose.disconnect();

    console.log('Succesful disconnected');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
