import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/users';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   const { categoryId } = req.query;

    //   const query : QueryProducts = {};

    //   if(categoryId && typeof categoryId == 'string')
    //     query.categoryId = categoryId;

    // const users = await UserModel.find(
    //   { admin: true },
    //   { name: true, username: true, _id: false }
    // );

    const users = await UserModel.find();

    res.json({
      data: users,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, password, admin } = req.body;

    // const user = {
    //   name: 'Aldo Capezzali',
    //   username: 'aldocape',
    //   password: '123456',
    //   admin: true,
    // };

    const estudiantes = [
      {
        nombre: 'Pedro',
        apellido: 'Mei',
        edad: 21,
        dni: '31155898',
        curso: '1A',
        nota: 7,
      },
      {
        nombre: 'Ana',
        apellido: 'Gonzalez',
        edad: 32,
        dni: '27651878',
        curso: '1A',
        nota: 8,
      },
      {
        nombre: 'José',
        apellido: 'Picos',
        edad: 29,
        dni: '34554398',
        curso: '2A',
        nota: 6,
      },
      {
        nombre: 'Lucas',
        apellido: 'Blanco',
        edad: 22,
        dni: '30355874',
        curso: '3A',
        nota: 10,
      },
      {
        nombre: 'María',
        apellido: 'García',
        edad: 36,
        dni: '29575148',
        curso: '1A',
        nota: 9,
      },
      {
        nombre: 'Federico',
        apellido: 'Perez',
        edad: 41,
        dni: '320118321',
        curso: '2A',
        nota: 5,
      },
      {
        nombre: 'Tomas',
        apellido: 'Sierra',
        edad: 19,
        dni: '38654790',
        curso: '2B',
        nota: 4,
      },
      {
        nombre: 'Carlos',
        apellido: 'Fernández',
        edad: 33,
        dni: '26935670',
        curso: '3B',
        nota: 2,
      },
      {
        nombre: 'Fabio',
        apellido: 'Pieres',
        edad: 39,
        dni: '4315388',
        curso: '1B',
        nota: 9,
      },
      {
        nombre: 'Daniel',
        apellido: 'Gallo',
        edad: 25,
        dni: '37923460',
        curso: '3B',
        nota: 2,
      },
    ];

    const newUser = await UserModel.create({
      name,
      username,
      password,
      admin,
    });

    res.json({
      data: newUser,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        error: err.message,
        stack: err.stack,
      });
    else next(err);
  }
};
