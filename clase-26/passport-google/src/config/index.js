import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_ATLAS_URL:
    process.env.MONGO_ATLAS_SRV ||
    'mongodb://aldo:123456@localhost:27017/ecommerce',
  PORT: process.env.PORT || 8080,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
