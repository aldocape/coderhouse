import { createTableMsg } from '../controller/messages';
import { createTableProducts } from '../controller/products';

export const createTables = () => {
  createTableMsg();
  createTableProducts();
};
