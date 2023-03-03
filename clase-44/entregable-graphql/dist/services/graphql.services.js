"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlRoot = exports.graphqlSchema = void 0;
const graphql_1 = require("graphql");
const products_controllers_1 = require("../controllers/graphql/products.controllers");
exports.graphqlSchema = (0, graphql_1.buildSchema)(`
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
exports.graphqlRoot = {
    saveProduct: products_controllers_1.saveController,
    getAllProducts: products_controllers_1.getAllController,
    getProductById: products_controllers_1.getProdByIdController,
    updateProduct: products_controllers_1.updateProdController,
    deleteProductById: products_controllers_1.deleteProdByIdController,
};
