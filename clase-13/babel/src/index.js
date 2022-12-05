// import sumar from './calculadora';

// const a = 24;
// const b = 55;

// console.log(`El resultado de sumar ${a} con ${b} es igual a ${sumar(a, b)}`);

import Server from './services/server';

const PORT = 8080;

Server.listen(PORT, () => {
  console.log('Está todo joya en el server!!');
});
