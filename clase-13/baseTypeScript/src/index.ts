import server from './services/server';

// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = 'Hello World';
console.log(anExampleVariable);

let numero = 25;

const palabra: string = '24';

const num1 = 49;
const num2 = 29;
const sumar = (a: number, b: number): number => a + b;

type Algo = {
  nombre: string;
  domicilio: string;
  edad?: number;
};

const persona: Algo = {
  nombre: 'Aldo',
  domicilio: 'Sargento Cabral 2413',
  edad: 40,
};

console.log(persona);
console.log(
  `Hola quiero sumar ${num1} más ${num2} eso me da como resultado ${sumar(
    num1,
    num2
  )}`
);

console.log(`Hola! Soy ${persona.nombre} y vivo en ${persona.domicilio}`);
console.log(`Tengo ${persona.edad} años`);

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server up en puerto ${PORT}`);
});
