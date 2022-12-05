import express from 'express';
// const express = require('express');

const app = express();

// const devolverAleatorios = (req, res) => {
//   const respuesta = [];

//   for (let index = 0; index < 10; index++) {
//     respuesta.push({
//       nombre: faker.name.firstName(),
//       apellido: faker.name.lastName(),
//       color: faker.vehicle.color(),
//     });
//   }

//   res.json(respuesta);
// };

import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';

faker.locale = 'es';

const createRandomUser = (req, res) => {
  const respuesta = [];

  let cant = 10;
  if (req.query.cant) cant = req.query.cant;

  for (let index = 0; index < cant; index++) {
    respuesta.push({
      id: index + 1,
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      color: faker.vehicle.color(),
    });
  }

  res.json(respuesta);

  //   res.json({
  //     name: faker.name.firstName(),
  //     lastname: faker.name.lastName(),
  //     email: faker.internet.email(),
  //     avatar: faker.image.avatar(),
  //     password: faker.internet.password(),
  //     birthdate: faker.date.birthdate(),
  //     registeredAt: faker.date.past(),
  //   });
};

const PORT = 8080;

app.get('/test', createRandomUser);

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`);
});
