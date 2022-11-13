"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteDB = exports.mariaDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mariaDB = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'coderhouse',
    },
};
exports.mariaDB = mariaDB;
const SQLiteDB = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite',
    },
    useNullAsDefault: true,
};
exports.SQLiteDB = SQLiteDB;
