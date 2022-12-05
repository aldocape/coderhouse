import SQLClient from './sql.js';
import { options } from './options/db.js';

const sql = new SQLClient(options);

async function getAll() {
  const products = await sql.getAllProducts();
  console.table(products);
  sql.close();
}

getAll();
