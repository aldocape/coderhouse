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
const carts_1 = __importDefault(require("../models/carts"));
// Clase Carts con persistencia de datos en MongoDB
class Carts {
    // Método 'add' crea un carrito vacío, pero además permite recibir como parámetro un array de productos
    // para tener la posibilidad también de crearlo con algún contenido
    add(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = yield carts_1.default.create(cart);
            return newCart;
        });
    }
    // Método getById obtiene un carrito por id y además haciendo uso de la función 'populate'
    // traigo los datos de todos los productos contenidos en ese carrito, esto se puede debido a que se
    // encuentra referenciado a la colección de productos
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carts_1.default.findById(id).populate({
                path: 'productos',
            });
            return cart;
        });
    }
    // Método update actualiza un carrito, pasándole dicho carrito por parámetro
    // Con la propiedad new: true, le estamos diciendo que devuelva como resultado el carrito modificado
    update(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifiedCart = yield carts_1.default.findByIdAndUpdate(id, cart, {
                new: true,
            });
            return modifiedCart;
        });
    }
    // // Método delete elimina un carrito por id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield carts_1.default.findByIdAndDelete(id);
            return result;
        });
    }
}
const cartInstance = new Carts();
// Exporto una instancia de la clase Carts
exports.default = cartInstance;
