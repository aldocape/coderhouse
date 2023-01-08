import minimist from 'minimist';

console.log('Variable process Argv sin minimist');
console.log(process.argv);

const args = minimist(process.argv);

console.log('Variable process Argv con minimist');
console.log(args);

console.log(args.port);
console.log('Path de ejecución: ' + '"' + args._[0] + '"');

// para pasar como parámetro variables de un solo caracter, usamos un guion(-)
// para nombres de parámetros de mayor longitud, usamos dos guiones(--)
// node src/index.js --nom aldo -a capezzali

// si pasamos sólo el parámetro sin valor, le asigna true
// node src/index.js --nom aldo -a capezzali --port 8080 --dev

const optionalArgsObject = {
  alias: {
    h: 'help',
    v: 'version',
    x: 'otroAlias',
    m: 'message',
  },
  default: {
    port: '5000',
    cluster: false,
  },
};

const args2 = minimist(process.argv, optionalArgsObject);
console.log(args2);

// ejemplo: node src/index.js --nom aldo -a capezzali --port 8080 --dev -h
// devuelve:
// {
//     _: [
//       '/usr/bin/node',
//       '/home/aldo/Documentos/proyectos/coderhouse/clase-27/src/index.js'
//     ],
//     nom: 'aldo',
//     a: 'capezzali',
//     port: 8080,
//     dev: true,
//     h: true,
//     help: true,
//     cluster: false
//   }

// si no hubiéramos pasado la variable 'port' como parámetro, port usaría el valor default que le dijimos (5000)
