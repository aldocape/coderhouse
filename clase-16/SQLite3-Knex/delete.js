import SQLClient from './sql.js';
import { options } from './options/db.js';

const sql = new SQLClient(options);

function deleteProduct(id) {
  sql.deleteProductById(id).then(() => {
    console.log(`El producto con id ${id} ha sido eliminado`);
    sql.close();
  });
}

deleteProduct(3);
