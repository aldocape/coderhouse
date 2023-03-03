import { buildSchema } from 'graphql';
import {
  saveController,
  getAllController,
  getProdByIdController,
  updateProdController,
  deleteProdByIdController,
} from '../controllers/graphql/products.controllers';

export const graphqlSchema = buildSchema(`
type Product{
    id: String!
    nombre: String!
    descripcion: String
    codigo: String!
    foto: String
    precioARS: Float!
    precioUSD: Float!
    stock: Int!
}
type NewProduct{
    id: String!
    nombre: String!
    descripcion: String
    codigo: String!
    foto: String
    precio: Float!
    stock: Int!
}
type Query{
    getAllProducts:[Product]
    getProductById(id: String!): Product
}
input IProduct{
    nombre: String!
    descripcion: String
    codigo: String!
    foto: String
    precio: Float!
    stock: Int!
}
input IProductEdit{
    nombre: String
    descripcion: String
    codigo: String
    foto: String
    precio: Float
    stock: Int
}
type Mutation{
    saveProduct(data: IProduct):NewProduct
    updateProduct(id: String!, data: IProductEdit):NewProduct
    deleteProductById(id: String!):Boolean
}
`);

export const graphqlRoot = {
  saveProduct: saveController,
  getAllProducts: getAllController,
  getProductById: getProdByIdController,
  updateProduct: updateProdController,
  deleteProductById: deleteProdByIdController,
};
