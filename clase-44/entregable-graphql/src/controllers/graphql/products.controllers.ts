import {
  saveProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct,
} from '../../services/products.services';

interface args {
  id: string;
  data?: any;
}

export const saveController = async ({ data }: args) => {
  const newProd = await saveProduct(data);
  return newProd;
};

export const getAllController = async () => {
  return await getAllProducts();
};

export const getProdByIdController = async (args: args) => {
  const { id } = args;
  const product = await getProductById(id);
  return product;
};

export const updateProdController = async ({ id, data }: args) => {
  const product = await updateProduct(id, data);
  return product;
};

export const deleteProdByIdController = async ({ id }: any) => {
  const deleted = await deleteProductById(id);
  if (deleted) return true;
};
