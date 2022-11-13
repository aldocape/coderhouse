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
exports.createTableProducts = exports.deleteById = exports.getAll = exports.getById = exports.update = exports.add = void 0;
const db_1 = require("../services/db");
const products_1 = __importDefault(require("../services/products"));
// Instancio la clase, pasando al constructor el objeto con los datos de configuración de mariaDB
// y el nombre de la tabla que va a utilizar
const sql = new products_1.default(db_1.mariaDB, 'products');
const add = (prod) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sql.createProduct(prod);
    }
    catch (error) {
        return error.message;
    }
});
exports.add = add;
const update = (prod) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sql.updateProduct(prod);
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
});
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sql.listProducts(id);
    }
    catch (error) {
        return error.message;
    }
});
exports.getById = getById;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield sql.listProducts();
        return {
            success: true,
            products,
        };
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
});
exports.getAll = getAll;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return sql.deleteProduct(id);
    }
    catch (error) {
        return error.message;
    }
});
exports.deleteById = deleteById;
const createTableProducts = () => {
    try {
        sql.createTable().then(() => {
            sql.createProductsHardcoded().then(() => {
                console.log('Tabla productos y datos de prueba, creados con éxito!!');
                return;
            });
        });
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
};
exports.createTableProducts = createTableProducts;
