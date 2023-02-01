"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsCollection = void 0;
const mongoose_1 = require("mongoose");
// Exporto el nombre de la colección para usarla en el modelo de carrito
// De esta manera, si después cambia el nombre, se referencia automáticamente a la nueva colección
exports.productsCollection = 'product';
const ProductSchema = new mongoose_1.Schema({
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, max: 400 },
    codigo: { type: String, require: true, max: 50 },
    foto: { type: String, max: 300 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
}, { timestamps: true, versionKey: false });
exports.default = (0, mongoose_1.model)(exports.productsCollection, ProductSchema);
