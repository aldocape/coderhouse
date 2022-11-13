import dotenv from 'dotenv';
dotenv.config();

const mariaDB = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'coderhouse',
  },
};

const SQLiteDB = {
  client: 'sqlite3',
  connection: {
    filename: './DB/ecommerce.sqlite',
  },
  useNullAsDefault: true,
};

export { mariaDB, SQLiteDB };
