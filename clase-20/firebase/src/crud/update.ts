import { UserDB } from '../services/db';
import { readSpecificUser } from './leer';

export const updateUser = async (id: string, data: any) => {
  await UserDB.doc(id).update(data);

  // Si leo directamente el resultado del update, me devuelve algo asi:
  //  WriteResult {
  //     _writeTime: Timestamp { _seconds: 1669227422, _nanoseconds: 574363000 }
  //   }

  // Busco los datos del nuevo usuario modificado con el id indicado

  const user = await readSpecificUser(id);

  // Devuelvo el usuario modificado
  return user;
};
