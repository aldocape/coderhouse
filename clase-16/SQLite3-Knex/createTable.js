import SQLClient from './sql.js';
import { options } from './options/db.js';

const sql = new SQLClient(options);

function createTableSQLite3() {
  sql.createTable().then(() => {
    console.log('Tabla creada con éxito');
    sql.close();
  });
}

createTableSQLite3();
