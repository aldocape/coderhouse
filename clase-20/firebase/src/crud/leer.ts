import { UserDB } from '../services/db';

export const readAllUsers = async () => {
  const result = await UserDB.get();
  const docs = result.docs;

  const output = docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  return output;
};

export const readSpecificUser = async (id: string) => {
  const result = await UserDB.doc(id).get();

  return {
    id: result.id,
    data: result.data(),
  };
};
