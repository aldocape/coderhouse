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
const supertest_1 = __importDefault(require("supertest"));
const factory_1 = require("../daos/factory");
const server_1 = require("../services/server");
describe('Test E2E de Productos', () => {
    let request;
    let daoTest;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        request = (0, supertest_1.default)(server_1.myHTTPServer);
        const Dao = factory_1.DaoFactory.create('mongo', true);
        let ProductDao;
        if (Dao) {
            ProductDao = Dao.productHandler();
            yield ProductDao.deleteAll();
        }
    }));
    // afterEach(async () => {
    //   console.log(
    //     'EJECUTO afterEach PARA BORRAR TODO LO QUE HAYA CREADO EN LOS TESTS'
    //   );
    //   await ProductModel.deleteMany();
    // });
    // afterAll(async () => {
    //   await daoTest.disconnect();
    //   Server.close();
    // });
    // it('Deberia traer una lista vacia de productos', async () => {
    //   const expectedResponse = {
    //     data: [],
    //   };
    //   const response = await request.get('/api/products');
    //   expect(response.body).toEqual(expectedResponse);
    // });
    // it('Deberia devolverme un error 404 si quiero buscar un producto que no existe', async () => {
    //   const expectedResponse = {
    //     data: 'objeto no encontrado',
    //   };
    //   const response = await request.get('/api/products/1234');
    //   expect(response.status).toEqual(404);
    //   expect(response.body).toEqual(expectedResponse);
    // });
    // it('Deberia devolverme un error 400 si quiero crear un producto si no envio body', async () => {
    //   const expectedErrorMessage = 'Invalid Body Parameter';
    //   const body = {};
    //   let response = await request.post('/api/products');
    //   expect(response.status).toEqual(400);
    //   expect(response.body.msg).toEqual(expectedErrorMessage);
    //   expect(response.body.error).toBeDefined();
    //   response = await request.post('/api/products').send(body);
    //   expect(response.status).toEqual(400);
    //   expect(response.body.error).toBeDefined();
    // });
    // it('Deberia crear un objeto correctamente', async () => {
    //   const body = {
    //     nombre: 'Remera',
    //     precio: 22,
    //     stock: 15,
    //   };
    //   let response = await request.post('/api/products').send(body);
    //   expect(response.status).toEqual(200);
    //   expect(response.body.msg).toEqual('producto agregado con exito');
    //   expect(response.body.data).toBeDefined();
    //   const newProductId = response.body.data._id;
    //   const expectedResponse = {
    //     data: [{ _id: newProductId, ...body }],
    //   };
    //   response = await request.get(`/api/products/${newProductId}`);
    //   expect(response.status).toEqual(200);
    //   expect(response.body).toEqual(expectedResponse);
    // });
});
