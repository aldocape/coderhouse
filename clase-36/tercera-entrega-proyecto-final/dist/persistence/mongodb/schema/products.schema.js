"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, max: 400 },
    codigo: { type: String, require: true, max: 50 },
    foto: { type: String, max: 300 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
}, { timestamps: true, versionKey: false });
