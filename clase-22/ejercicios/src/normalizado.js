import fs from 'fs';
import path from 'path';
import util from 'util';
import { fileURLToPath } from 'url';
import { normalize, schema, denormalize } from 'normalizr';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const __inputPath = path.join(__dirName, '../data.json');
const __inputPathEmpresa = path.join(__dirName, '../empresa.json');
const __normalizedPathEmpresa = path.join(
  __dirName,
  '../empresaNormalized.json'
);

export const original = async (req, res) => {
  const data = await fs.promises.readFile(__inputPath, 'utf-8');
  res.json(JSON.parse(data));
};

export const normalizado = async (req, res) => {
  const data = await fs.promises.readFile(__inputPath, 'utf-8');

  const user = new schema.Entity(
    'users',
    {},
    {
      idAttribute: '_id',
    }
  );

  const comment = new schema.Entity('comments', {
    commenter: user,
  });

  const article = new schema.Entity('articles', {
    author: user,
    comments: [comment],
  });

  const finalSchema = [article];

  const normalizedData = normalize(JSON.parse(data), finalSchema);

  res.json(normalizedData);
};

const employee = new schema.Entity(
  'employee',
  {},
  {
    idAttribute: 'id',
  }
);

const company = new schema.Entity('company', {
  presidente: employee,
  vicePresidente: employee,
  empleados: [employee],
});

const finalSchema = [company];

export const originalEmpresa = async (req, res) => {
  const data = await fs.promises.readFile(__inputPathEmpresa, 'utf-8');
  res.json(JSON.parse(data));
};

export const normalizadoEmpresa = async (req, res) => {
  const data = await fs.promises.readFile(__inputPathEmpresa, 'utf-8');

  const normalizedData = normalize(JSON.parse(data), finalSchema);

  let contenido = JSON.stringify(normalizedData, null, '\t');

  await fs.promises.writeFile(__normalizedPathEmpresa, contenido);

  const statOriginal = await fs.promises.stat(__inputPathEmpresa);
  const statNormalizado = await fs.promises.stat(__normalizedPathEmpresa);

  // console.log(util.inspect(contenido, false, 7, true));
  console.log(contenido.length);
  console.log(data.length);

  res.json({
    data: normalizedData,
    sizeOriginal: statOriginal.size,
    sizeNormalizado: statNormalizado.size,
  });
};

export const desnormalizadoEmpresa = async (req, res) => {
  const data = await fs.promises.readFile(__normalizedPathEmpresa, 'utf-8');

  const normalized = JSON.parse(data);

  const denormalizedData = denormalize(
    normalized.result,
    finalSchema,
    normalized.entities
  );

  res.json(denormalizedData);
};
