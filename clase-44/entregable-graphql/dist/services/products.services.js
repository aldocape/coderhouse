"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllProducts = exports.deleteProductById = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.saveProduct = void 0;
const daos_1 = require("../daos/daos");
function saveProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const prod = yield (0, daos_1.save)('product', product);
        return prod;
    });
}
exports.saveProduct = saveProduct;
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, daos_1.getAll)('product');
        return products;
    });
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, daos_1.getById)('product', id);
        return product;
    });
}
exports.getProductById = getProductById;
function updateProduct(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productModified = yield (0, daos_1.update)('product', id, product);
        return productModified;
    });
}
exports.updateProduct = updateProduct;
function deleteProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, daos_1.deleteById)('product', id);
        return product;
    });
}
exports.deleteProductById = deleteProductById;
function deleteAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, daos_1.deleteAll)('product');
        return product;
    });
}
exports.deleteAllProducts = deleteAllProducts;
