import { faker } from '@faker-js/faker';

faker.locale = 'es';

export const getWithFaker = () => {
  try {
    const products = [];

    let cant = 5;

    for (let index = 0; index < cant; index++) {
      products.push({
        id: index + 1,
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        departamento: faker.commerce.department(),
        precio: faker.commerce.price(),
        foto: faker.image.image(),
        codigo: faker.datatype.string(),
        timestamp: faker.datatype.datetime(),
        stock: faker.datatype.number({ max: 500 }),
      });
    }
    return {
      success: true,
      products,
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};
