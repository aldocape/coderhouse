import SQLClient from './sql.js';
import { options } from './options/db.js';

const sql = new SQLClient(options);

async function updateStock(stock, id) {
  await sql.updateStockById(stock, id);
  const products = await sql.getAllProducts();
  console.table(products);
  sql.close();
}

updateStock(10, 2);
