import {
  save,
  getById,
  deleteById,
  update,
  findOne,
  getAll,
} from '../persistence/persistence';

import { Usuario } from '../interfaces';

export async function saveUser(user: Usuario) {
  const newUser = await save('user', user);
  return newUser;
}

export async function getUserById(id: string) {
  const user = await getById('user', id);
  return user;
}

export async function deleteUserById(id: string) {
  const user = await deleteById('user', id);
  return user;
}

export async function updateUser(id: string, user: Usuario) {
  const userModified = await update('user', id, user);
  return userModified;
}

export async function findOneUser(field: any) {
  const user = await findOne('user', field);
  return user;
}

export async function getAllUsers() {
  const users = await getAll('user');
  return users;
}
