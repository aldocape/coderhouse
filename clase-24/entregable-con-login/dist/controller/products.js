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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../models/products"));
// Clase Products con persistencia de datos en MongoDB
class Products {
    // Método getAll obtiene todos los productos
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_1.default.find();
            return products;
        });
    }
    // Método getById obtiene un producto por id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_1.default.findById(id);
            return product;
        });
    }
    // Método 'add' agrega un documento de tipo producto a la colección 'products'
    add(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield products_1.default.create(product);
            return newProduct;
        });
    }
    // Método deleteById elimina un producto por id
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_1.default.findByIdAndDelete(id);
            return product;
        });
    }
    // Método update actualiza un producto, recibe dos variables por parámetro: el id y el producto modificado
    // Con la propiedad new: true, le estamos diciendo que devuelva como resultado el producto modificado
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            // Actualizo el documento usando `updateOne()`
            yield products_1.default.updateOne({ _id: id }, product);
            // Cargo el documento para ver los nuevos valores
            const updatedProduct = yield products_1.default.findOne();
            return updatedProduct;
        });
    }
}
const prodInstance = new Products();
// Exporto una instancia de la clase Products
exports.default = prodInstance;
