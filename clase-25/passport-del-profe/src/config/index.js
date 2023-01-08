import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_ATLAS_URL:
    process.env.MONGO_ATLAS_SRV || 'mongodb://localhost/coderhouse',
  PUERTO: process.env.PORT || 8080,
};
