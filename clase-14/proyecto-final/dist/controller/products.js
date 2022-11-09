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
const files_1 = require("./files");
// Lógica de negocio/api para el manejo de Productos
class Products {
    // Método 'add' agrega un producto a la lista, o en caso que no exista ninguno, crea el archivo y el carrito
    add(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield files_1.productsObj.saveItem(prod);
            return newProduct;
        });
    }
    // Método update actualiza un producto, pasándole dicho producto por parámetro
    update(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifiedProduct = yield files_1.productsObj.update(prod);
            return modifiedProduct;
        });
    }
    // Método getById obtiene un producto por id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield files_1.productsObj.getById(id);
            return product;
        });
    }
    // Método getAll obtiene todos los productos
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield files_1.productsObj.getAll();
            return products;
        });
    }
    // Método deleteById elimina un producto por id
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield files_1.productsObj.deleteById(id);
            return result;
        });
    }
}
const prodInstance = new Products();
// Exporto una instancia de la clase Products
exports.default = prodInstance;
