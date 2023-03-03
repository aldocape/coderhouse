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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const getFunctionAsync = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(url);
        return res.data;
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
const postFunctionAsync = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post(url, data);
        return res.data;
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
const putFunctionAsync = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.put(url, data);
        return res.data;
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
const deleteFunctionAsync = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.delete(url);
        return res.data;
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
const data = {
    nombre: 'Mochila Everlast Original',
    descripcion: 'Compuesta por materiales de primera calidad, con costuras y cierres reforzados',
    foto: 'https://http2.mlstatic.com/D_NQ_NP_753890-MLA50800352981_072022-O.webp',
    codigo: '5475876865',
    precio: 11599,
};
const modifiedData = {
    nombre: 'Mochila Impermeable Reforzada Everlast',
    descripcion: 'otra descripcion',
    foto: 'https://http2.mlstatic.com/D_NQ_NP_670562-MLA52463950125_112022-O.webp',
    precio: 13599,
};
// Prueba de agregar nuevo producto con Axios
const newProduct = postFunctionAsync('http://localhost:8080/api/productos', data);
// Una vez que el producto fue creado, trabajo con el resultado de la promesa
// para poder modificarlo y luego eliminarlo
newProduct.then((newProduct) => {
    // Muestro por consola el nuevo producto
    logger_1.default.info(`${JSON.stringify(newProduct)}\n\n`);
    // Prueba de modificar un producto con Axios, usando el id que trae el nuevo producto
    const modifiedProduct = putFunctionAsync(`http://localhost:8080/api/productos/${newProduct.newProd._id}`, modifiedData);
    // Una vez que fue modificado, muestro esa respuesta en el resultado de la promesa
    modifiedProduct.then((modified) => {
        logger_1.default.info(`${JSON.stringify(modified)}\n\n`);
        // Prueba de obtener todos los productos con Axios
        // Verificamos que en el listado figura el producto nuevo, ya modificado
        const allProducts = getFunctionAsync('http://localhost:8080/api/productos');
        allProducts.then((prods) => {
            logger_1.default.info(`${JSON.stringify(prods)}\n\n`);
            // Prueba de eliminar un producto con Axios
            // Verificamos que se elimina el producto con el id del nuevo producto
            const deletedProduct = deleteFunctionAsync(`http://localhost:8080/api/productos/${newProduct.newProd._id}`);
            deletedProduct.then((deleted) => {
                logger_1.default.info(JSON.stringify(deleted));
            });
        });
    });
});
