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
exports.deleteProdByIdController = exports.updateProdController = exports.getProdByIdController = exports.getAllController = exports.saveController = void 0;
const products_services_1 = require("../../services/products.services");
const saveController = ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
    const newProd = yield (0, products_services_1.saveProduct)(data);
    return newProd;
});
exports.saveController = saveController;
const getAllController = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, products_services_1.getAllProducts)();
});
exports.getAllController = getAllController;
const getProdByIdController = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = args;
    const product = yield (0, products_services_1.getProductById)(id);
    return product;
});
exports.getProdByIdController = getProdByIdController;
const updateProdController = ({ id, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, products_services_1.updateProduct)(id, data);
    return product;
});
exports.updateProdController = updateProdController;
const deleteProdByIdController = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield (0, products_services_1.deleteProductById)(id);
    if (deleted)
        return true;
});
exports.deleteProdByIdController = deleteProdByIdController;
