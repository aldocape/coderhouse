import { UserDB } from '../services/db';

type UserData = {
  first: string;
  last: string;
  address: string;
  birthday: string;
  age: number;
};

export const addUser = async (data: UserData) => {
  try {
    const userDocument = UserDB.doc();
    await userDocument.create(data);
    console.log('Todo ok');
  } catch (err: any) {
    console.log(err.message);
  }
};
