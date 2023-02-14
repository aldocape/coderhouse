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
exports.updateCart = exports.deleteCartById = exports.getCartById = exports.saveCart = void 0;
const daos_1 = require("../daos/daos");
function saveCart(cart) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCart = yield (0, daos_1.save)('cart', cart);
        return newCart;
    });
}
exports.saveCart = saveCart;
function getCartById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield (0, daos_1.getById)('cart', id);
        return cart;
    });
}
exports.getCartById = getCartById;
function deleteCartById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield (0, daos_1.deleteById)('cart', id);
        return cart;
    });
}
exports.deleteCartById = deleteCartById;
function updateCart(id, cart) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartModified = yield (0, daos_1.update)('cart', id, cart);
        return cartModified;
    });
}
exports.updateCart = updateCart;
