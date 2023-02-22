import { myHTTPServer } from '../services/server';
import { DaoFactory } from '../daos/factory';
import supertest from 'supertest';

import Chai from 'chai';
import ProductsDTO from '../dto/products.dto';

const { expect } = Chai;

let ProductDao: any;
let Dao: any;
let request: supertest.SuperTest<supertest.Test>;

describe('Comprobando que la API de productos funcione bien', () => {
  before(async () => {
    console.log('\n********* Comienzo TOTAL de Test *********');

    request = supertest(myHTTPServer);

    Dao = DaoFactory.create('mongo', true);
    if (Dao) {
      ProductDao = await Dao.productHandler();
      await ProductDao.deleteAll();
    }
  });

  after(async () => {
    console.log('\n********* Fin TOTAL de Test *********');
    myHTTPServer.close();
    await ProductDao.deleteAll();
    await ProductDao.disconnectMongo();
  });

  it('Debería obtener lista vacía de productos de la BD con código 200', async () => {
    const products = await request.get('/api/productos');

    expect(products.status).to.equal(200);
    expect(products.body).to.have.lengthOf(0);
  });

  it('Debería guardar un producto correctamente en la BD y luego encontrarlo por su id', async () => {
    const body = {
      nombre: 'Bicicleta',
      codigo: '39248732894',
      precio: 50000,
      stock: 15,
    };

    let response = await request.post('/api/productos').send(body);

    expect(response.status).to.equal(201);
    expect(response.body.msg).to.equal('Producto creado con éxito');
    expect(response.body).to.have.property('newProd');

    const newProductId = response.body.newProd._id;

    const expectedResponse = new ProductsDTO(response.body.newProd, true);

    response = await request.get(`/api/productos/${newProductId}`);
    expect(response.status).to.equal(200);

    expect(response.body.id).to.equal(expectedResponse.id);
    expect(response.body.nombre).to.equal(expectedResponse.nombre);
    expect(response.body.precioARS).to.equal(expectedResponse.precioARS);
    expect(JSON.stringify(response.body)).to.equal(
      JSON.stringify(expectedResponse)
    );
  });

  it('Debería actualizar un producto correctamente', async () => {
    // Cargamos otro producto en la BD, para capturar su id
    const body = {
      nombre: 'Bicicleta',
      codigo: '39248732894',
      precio: 50000,
      stock: 15,
    };

    const response = await request.post('/api/productos').send(body);

    // Verificamos que todo salió bien, con código 201 (nuevo registro)
    expect(response.status).to.equal(201);

    // Armamos un producto distinto al anterior, para modificarlo en la BD
    const modified = {
      nombre: 'Bicicleta de carrera',
      precio: 58000,
      stock: 20,
    };

    // Hacemos la request con método put, al endpoint /api/productos/:id
    const product = await request
      .put(`/api/productos/${response.body.newProd._id}`)
      .send(modified);

    // Verificamos que los valores que devuelve la request son los mismos que los del producto modificado
    expect(product.body.nombre).to.equal(modified.nombre);
    expect(product.body.precio).to.equal(modified.precio);
    expect(product.body.stock).to.equal(modified.stock);
  });

  it('Debería eliminar un producto de la BD', async () => {
    // Cargamos otro producto en la BD, para capturar su id
    const body = {
      nombre: 'Bicicleta',
      codigo: '39248732894',
      precio: 50000,
      stock: 15,
    };

    const response = await request.post('/api/productos').send(body);

    const deleted = await request.delete(
      `/api/productos/${response.body.newProd._id}`
    );

    expect(deleted.status).to.equal(200);
    expect(deleted.body.msg).to.equal(
      `El producto con id "${response.body.newProd._id}" ha sido eliminado`
    );
  });
});
