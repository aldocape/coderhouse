import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectionString =
  process.env.MONGO_ATLAS_SRV ||
  'mongodb://aldo:123456@localhost:27017/ecommerce';

// Conexión a la BD de Mongo
(async () => {
  try {
    console.log('Connecting...');
    const db = await mongoose.connect(connectionString);

    console.log('Database is connected to:', db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
