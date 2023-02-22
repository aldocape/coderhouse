import axios from 'axios';
import logger from '../middlewares/logger';

const getFunctionAsync = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    logger.error(err);
  }
};

const postFunctionAsync = async (url: string, data: any) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (err) {
    logger.error(err);
  }
};

const putFunctionAsync = async (url: string, data: any) => {
  try {
    const res = await axios.put(url, data);
    return res.data;
  } catch (err) {
    logger.error(err);
  }
};

const deleteFunctionAsync = async (url: string) => {
  try {
    const res = await axios.delete(url);
    return res.data;
  } catch (err) {
    logger.error(err);
  }
};

const data = {
  nombre: 'Mochila Everlast Original',
  descripcion:
    'Compuesta por materiales de primera calidad, con costuras y cierres reforzados',
  foto: 'https://http2.mlstatic.com/D_NQ_NP_753890-MLA50800352981_072022-O.webp',
  codigo: '5475876865',
  precio: 11599,
};

const modifiedData = {
  nombre: 'Mochila Impermeable Reforzada Everlast',
  foto: 'https://http2.mlstatic.com/D_NQ_NP_670562-MLA52463950125_112022-O.webp',
  precio: 13599,
};

// Prueba de agregar nuevo producto con Axios
const newProduct: Promise<any> = postFunctionAsync(
  'http://localhost:8080/api/productos',
  data
);

// Una vez que el producto fue creado, trabajo con el resultado de la promesa
// para poder modificarlo y luego eliminarlo
newProduct.then((newProduct) => {
  // Muestro por consola el nuevo producto
  logger.info(`${JSON.stringify(newProduct)}\n\n`);

  // Prueba de modificar un producto con Axios, usando el id que trae el nuevo producto
  const modifiedProduct = putFunctionAsync(
    `http://localhost:8080/api/productos/${newProduct.newProd._id}`,
    modifiedData
  );

  // Una vez que fue modificado, muestro esa respuesta en el resultado de la promesa
  modifiedProduct.then((modified) => {
    logger.info(`${JSON.stringify(modified)}\n\n`);

    // Prueba de obtener todos los productos con Axios
    // Verificamos que en el listado figura el producto nuevo, ya modificado
    const allProducts = getFunctionAsync('http://localhost:8080/api/productos');
    allProducts.then((prods) => {
      logger.info(`${JSON.stringify(prods)}\n\n`);

      // Prueba de eliminar un producto con Axios
      // Verificamos que se elimina el producto con el id del nuevo producto
      const deletedProduct = deleteFunctionAsync(
        `http://localhost:8080/api/productos/${newProduct.newProd._id}`
      );
      deletedProduct.then((deleted) => {
        logger.info(JSON.stringify(deleted));
      });
    });
  });
});
