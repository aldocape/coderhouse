const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

// hideBin nos oculta el contenido del array _:[]
const argv = yargs(hideBin(process.argv)).argv;

const argvSinhideBin = yargs(process.argv).argv;

console.log('\n\nArgumentos de yargs');
console.log(argv);
console.log(argvSinhideBin);
