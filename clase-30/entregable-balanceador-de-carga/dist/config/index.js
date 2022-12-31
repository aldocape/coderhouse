"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV ||
        'mongodb://aldo:123456@localhost:27017/ecommerce',
};
