import SQLClient from './sql.js';
import { options } from './options/db.js';

const sql = new SQLClient(options);

const products = [
  { name: 'Camiseta Argentina', code: 'AR-12', price: 12300, stock: 24 },
  { name: 'Camiseta Colombiana', code: 'CO-34', price: 11200, stock: 45 },
  { name: 'Camiseta Brasilera', code: 'BR-56', price: 6800, stock: 13 },
];

function insertInTableSQLite3() {
  sql.insertProduct(products).then(() => {
    console.log('Los productos han sido agregados a la tabla');
    sql.close();
  });
}

insertInTableSQLite3();
