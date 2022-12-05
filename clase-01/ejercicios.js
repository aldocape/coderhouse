// Definir variables que almacenen los siguientes datos:

// Un nombre: "pepe"

let nombre = 'pepe';

// Una edad: 25

let edad = 25;

// Un precio: $99.90

let precio = 99.9;

// Los nombres de mis series favoritas

let misSeriesFavoritas = ['Dark', 'Mr. Robot', 'Castlevania'];

// Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.

const misPeliculasFavoritas = [
  {
    nombre: 'Matrix',
    fechaEstreno: new Date('1999-06-10'),
    actores: [
      'Keanu Reeves',
      'Laurence Fishburne',
      'Carrie-Anne Moss',
      'Hugo Weaving',
    ],
  },
  {
    nombre: 'Batman: El caballero de la noche',
    fechaEstreno: new Date('2008-07-17'),
    actores: ['Christian Bale', 'Heath Ledger', 'Michael Caine', 'Gary Oldman'],
  },
  {
    nombre: 'El señor de los anillos: La comunidad del anillo',
    fechaEstreno: new Date('2001-12-19'),
    actores: ['Elijah Wood', 'Ian McKellen', 'Liv Tyler', 'Viggo Mortensen'],
  },
];

console.log(nombre);
console.log(edad);
console.log(precio);
console.log(misSeriesFavoritas);
console.log(misPeliculasFavoritas);

edad += 1;
misSeriesFavoritas.push('Breaking Bad');

console.log(edad);
console.log(misSeriesFavoritas);
