import { UserDB } from '../services/db';

export const deleteUser = async (id: string) => {
  await UserDB.doc(id).delete();
  console.log('Terminado');
};
