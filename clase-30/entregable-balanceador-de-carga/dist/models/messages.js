"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesCollection = void 0;
const mongoose_1 = require("mongoose");
exports.messagesCollection = 'messages';
const MessageSchema = new mongoose_1.Schema({
    time: { type: String, require: true, max: 100 },
    text: { type: String, require: true, max: 600 },
    author: {
        email: { type: String, require: true, max: 50 },
        nombre: { type: String, require: true, max: 40 },
        apellido: { type: String, require: true, max: 40 },
        edad: { type: Number, require: true },
        alias: { type: String, require: true, max: 40 },
        avatar: { type: String, max: 300 },
    },
}, { timestamps: false, versionKey: false });
exports.default = (0, mongoose_1.model)(exports.messagesCollection, MessageSchema);
