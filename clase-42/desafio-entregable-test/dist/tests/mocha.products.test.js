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
const server_1 = require("../services/server");
const factory_1 = require("../daos/factory");
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = __importDefault(require("chai"));
const products_dto_1 = __importDefault(require("../dto/products.dto"));
const { expect } = chai_1.default;
let ProductDao;
let Dao;
let request;
describe('Comprobando que la API de productos funcione bien', () => {
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('\n********* Comienzo TOTAL de Test *********');
        request = (0, supertest_1.default)(server_1.myHTTPServer);
        Dao = factory_1.DaoFactory.create('mongo', true);
        if (Dao) {
            ProductDao = yield Dao.productHandler();
            yield ProductDao.deleteAll();
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('\n********* Fin TOTAL de Test *********');
        server_1.myHTTPServer.close();
        yield ProductDao.deleteAll();
        yield ProductDao.disconnectMongo();
    }));
    it('Debería obtener lista vacía de productos de la BD con código 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield request.get('/api/productos');
        expect(products.status).to.equal(200);
        expect(products.body).to.have.lengthOf(0);
    }));
    it('Debería guardar un producto correctamente en la BD y luego encontrarlo por su id', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            nombre: 'Bicicleta',
            codigo: '39248732894',
            precio: 50000,
            stock: 15,
        };
        let response = yield request.post('/api/productos').send(body);
        expect(response.status).to.equal(201);
        expect(response.body.msg).to.equal('Producto creado con éxito');
        expect(response.body).to.have.property('newProd');
        const newProductId = response.body.newProd._id;
        const expectedResponse = new products_dto_1.default(response.body.newProd, true);
        response = yield request.get(`/api/productos/${newProductId}`);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(expectedResponse.id);
        expect(response.body.nombre).to.equal(expectedResponse.nombre);
        expect(response.body.precioARS).to.equal(expectedResponse.precioARS);
        expect(JSON.stringify(response.body)).to.equal(JSON.stringify(expectedResponse));
    }));
    it('Debería actualizar un producto correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        // Cargamos otro producto en la BD, para capturar su id
        const body = {
            nombre: 'Bicicleta',
            codigo: '39248732894',
            precio: 50000,
            stock: 15,
        };
        const response = yield request.post('/api/productos').send(body);
        // Verificamos que todo salió bien, con código 201 (nuevo registro)
        expect(response.status).to.equal(201);
        // Armamos un producto distinto al anterior, para modificarlo en la BD
        const modified = {
            nombre: 'Bicicleta de carrera',
            precio: 58000,
            stock: 20,
        };
        // Hacemos la request con método put, al endpoint /api/productos/:id
        const product = yield request
            .put(`/api/productos/${response.body.newProd._id}`)
            .send(modified);
        // Verificamos que los valores que devuelve la request son los mismos que los del producto modificado
        expect(product.body.nombre).to.equal(modified.nombre);
        expect(product.body.precio).to.equal(modified.precio);
        expect(product.body.stock).to.equal(modified.stock);
    }));
    it('Debería eliminar un producto de la BD', () => __awaiter(void 0, void 0, void 0, function* () {
        // Cargamos otro producto en la BD, para capturar su id
        const body = {
            nombre: 'Bicicleta',
            codigo: '39248732894',
            precio: 50000,
            stock: 15,
        };
        const response = yield request.post('/api/productos').send(body);
        const deleted = yield request.delete(`/api/productos/${response.body.newProd._id}`);
        expect(deleted.status).to.equal(200);
        expect(deleted.body.msg).to.equal(`El producto con id "${response.body.newProd._id}" ha sido eliminado`);
    }));
});
