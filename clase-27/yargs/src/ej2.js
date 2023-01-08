const yargs = require('yargs');

const sumar = (argv) => {
  console.log('Estoy ejecutando la suma');
  const operando1 = argv.op1;
  const operando2 = argv.op2;

  console.log(`El resultado de la suma es ${operando1 + operando2}`);
};

const addCommand = {
  command: 'add',
  describe: 'Operación para sumar dos números',
  builder: {
    op1: {
      describe: 'operando 1 para hacer la suma',
      demandOption: true,
      type: 'number',
    },
    op2: {
      describe: 'operando 2 para hacer la suma',
      demandOption: true,
      type: 'number',
    },
  },
  handler: sumar,
};

yargs.version('23.12.2022');
yargs.command(addCommand);
yargs.parse();

// Comandos que podemos ejecutar:

/**
 * node src/ej2 --help
 * node src/ej2.js add --op1=5 --op2=6
 */
