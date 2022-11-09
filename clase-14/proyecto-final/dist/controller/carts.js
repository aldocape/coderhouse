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
// Lógica de negocio/api para el manejo de Carritos
class Carts {
    // Método 'save' agrega un carrito a la lista, o en caso que no exista ninguno, crea el archivo y el carrito
    add(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = yield files_1.cartsObj.saveItem(cart);
            return newCart;
        });
    }
    // Método getById obtiene un carrito por id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield files_1.cartsObj.getById(id);
            return cart;
        });
    }
    // Método update actualiza un carrito, pasándole dicho carrito por parámetro
    update(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifiedCart = yield files_1.cartsObj.update(cart);
            return modifiedCart;
        });
    }
    // Método delete elimina un carrito por id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield files_1.cartsObj.deleteById(id);
            return result;
        });
    }
}
const cartInstance = new Carts();
// Exporto una instancia de la clase Carts
exports.default = cartInstance;
