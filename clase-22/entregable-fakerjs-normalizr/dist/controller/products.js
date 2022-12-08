"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithFaker = void 0;
const faker_1 = require("@faker-js/faker");
faker_1.faker.locale = 'es';
const getWithFaker = () => {
    try {
        const products = [];
        let cant = 5;
        for (let index = 0; index < cant; index++) {
            products.push({
                id: index + 1,
                nombre: faker_1.faker.commerce.productName(),
                descripcion: faker_1.faker.commerce.productDescription(),
                departamento: faker_1.faker.commerce.department(),
                precio: faker_1.faker.commerce.price(),
                foto: faker_1.faker.image.image(),
                codigo: faker_1.faker.datatype.string(),
                timestamp: faker_1.faker.datatype.datetime(),
                stock: faker_1.faker.datatype.number({ max: 500 }),
            });
        }
        return {
            success: true,
            products,
        };
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
};
exports.getWithFaker = getWithFaker;
