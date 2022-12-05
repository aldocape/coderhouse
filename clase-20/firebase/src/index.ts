import { addUser } from './crud/agregar';
import { deleteUser } from './crud/borrar';
import { readAllUsers, readSpecificUser } from './crud/leer';
import { updateUser } from './crud/update';

const data = {
  first: 'Adolfo',
  last: 'Capezzali',
  address: 'Los Sauces 514',
  birthday: '05/01/1952',
  age: 70,
};

// addUser(data);
readAllUsers().then((data) => console.log(data));

/// Busco un usuario con id 'B4YKUo4W8LCjzsziOGqy'
// readSpecificUser('B4YKUo4W8LCjzsziOGqy').then((data) => console.log(data));

// const dataNueva = {
//   first: 'Aldo',
//   address: 'Sargento Cabral 2413',
// };

// const key = 'B4YKUo4W8LCjzsziOGqy';
// updateUser(key, dataNueva).then((data) => console.log(data));

const key = 'tE6OdF3eGPi128fFJKb5';
deleteUser(key);
