"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = void 0;
const messages_1 = require("../controller/messages");
const products_1 = require("../controller/products");
const createTables = () => {
    messages_1.createTableMsg();
    products_1.createTableProducts();
};
exports.createTables = createTables;
