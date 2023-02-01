import mongoose from 'mongoose';
import config from '../config';
import logger from '../middlewares/logger';

const connectionString = config.MONGO_ATLAS_URL;

// Conexión a la BD de Mongo
(async () => {
  try {
    logger.info('Connecting...');
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(connectionString);

    logger.info(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    logger.error(`ERROR => ${error}`);
  }
})();

export const disconnectMongo = async () => {
  try {
    logger.info('Disconnecting from database...');
    await mongoose.disconnect();

    logger.info('Succesful disconnected');
  } catch (error) {
    logger.error(`ERROR => ${error}`);
    return error;
  }
};
