import { normalize, schema, denormalize } from 'normalizr';
import fs from 'fs';
import path from 'path';
import express from 'express';

import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const inputPath = path.join(__dirName, '../data/input.json');
const normalizePath = path.join(__dirName, '../data/normalize.json');

const app = express();

app.get('/original', (req, res) => {
  const originalData = JSON.parse(fs.readFileSync(inputPath));

  res.json({
    originalData,
  });
});

const persona = new schema.Entity(
  'person',
  {},
  {
    idAttribute: 'id',
  }
);

const empresa = new schema.Entity('empresa', {
  gerente: persona,
  encargado: persona,
  empleados: [persona],
});

const holdingSchema = new schema.Entity('holding', {
  empresas: [empresa],
});

const finalSchema = holdingSchema;

app.get('/normalizar', (req, res) => {
  const originalData = JSON.parse(fs.readFileSync(inputPath));

  const normalizedData = normalize(originalData, finalSchema);

  const normalizedDataPath = path.resolve(normalizePath);
  let contenido = JSON.stringify(normalizedData, null, '\t');

  fs.writeFileSync(normalizedDataPath, contenido);
  res.json(normalizedData);
});

app.get('/desnormalizar', (req, res) => {
  const normalizedDataPath = path.resolve(normalizePath);

  const normalizedData = JSON.parse(fs.readFileSync(normalizedDataPath));

  const denormalizedData = denormalize(
    normalizedData.result,
    finalSchema,
    normalizedData.entities
  );

  res.json({
    denormalizedData,
  });
});

app.listen(8080, () => console.log('Ready'));
