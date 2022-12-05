import SQLClient from './sql.js';
import options from './options/db.js';

const sql = new SQLClient(options);

const products = [
  { name: 'Camiseta Argentina', code: 'AR-12', price: 12300, stock: 24 },
  { name: 'Camiseta Colombiana', code: 'CO-34', price: 11200, stock: 45 },
  { name: 'Camiseta Brasilera', code: 'BR-56', price: 6800, stock: 13 },
];

async function test() {
  await sql.createTable();
  console.log('Tabla creada');
  await sql.insertProduct(products);
  console.log('Productos insertados');
  const allProducts = await sql.getAllProducts();
  console.table(allProducts);
  await sql.deleteProductById(2);
  console.log(`Producto con id 2 ha sido eliminado`);
  await sql.updateStockById(23, 1);
  const allProducts2 = await sql.getAllProducts();
  console.table(allProducts2);
  sql.close();
}

test();
