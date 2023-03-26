import dotenv from 'dotenv';
dotenv.config();

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// hideBin nos oculta el contenido del array _:[]
const args: any = yargs(hideBin(process.argv))
  .default('mode', 'fork')
  .default('port', '8080')
  .default('dao', 'mongo').argv;

const argv: any = yargs(process.argv).argv;

let mongoDBSRV =
  process.env.MONGO_ATLAS_SRV ||
  'mongodb://aldo:123456@localhost:27017/ecommerce';

if (process.env.NODE_ENV === 'TEST_INT') {
  mongoDBSRV = process.env.MONGO_ATLAS_TEST_SRV || 'testSRV';
}

export default {
  MONGO_ATLAS_URL:
    mongoDBSRV || 'mongodb://aldo:123456@localhost:27017/ecommerce',
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY || 'secret',
  TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || '30m',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  GMAIL_NAME: process.env.GMAIL_NAME,
  NODE_ENV: process.env.NODE_ENV,
  ARGS: args,
  ARGV: argv,
};
