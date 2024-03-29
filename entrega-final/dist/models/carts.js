"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsCollection = void 0;
const mongoose_1 = require("mongoose");
const products_1 = require("./products");
exports.cartsCollection = 'cart';
const collection = products_1.productsCollection;
// La estructura del carrito contiene una propiedad llamada 'productos', que es un array de ObjectId de productos
// y también un timestamp que guarda la fecha de creación y de modificación
const cartSchema = new mongoose_1.Schema({
    productos: [
        {
            prodId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: collection,
                required: true,
            },
            cantidad: { type: Number, require: true },
        },
    ],
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)(exports.cartsCollection, cartSchema);
