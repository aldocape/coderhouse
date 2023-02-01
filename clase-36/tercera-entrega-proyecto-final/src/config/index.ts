import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGO_ATLAS_URL:
    process.env.MONGO_ATLAS_SRV ||
    'mongodb://aldo:123456@localhost:27017/ecommerce',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'aldocape@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'Aldo Capezzali',
  SID: process.env.SID || 'SID',
  TOKEN: process.env.TOKEN || 'TOKEN',
  CEL: process.env.CEL || 'CEL',
  ADMIN_CEL: process.env.ADMIN_CEL || 'ADMIN_CEL',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || 'TWILIO_CELLPHONE',
};
