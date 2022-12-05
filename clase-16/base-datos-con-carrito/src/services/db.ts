import dotenv from 'dotenv';
dotenv.config();
import knex from 'knex';

const mariaDB = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'coderhouse',
  },
});

const SQLiteDB = knex({
  client: 'sqlite3',
  connection: {
    filename: './DB/ecommerce.sqlite',
  },
  useNullAsDefault: true,
});

export { mariaDB, SQLiteDB };
