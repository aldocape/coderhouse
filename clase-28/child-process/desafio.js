const ordenar = (numeros) => {
  const data = numeros.sort((a, b) => {
    if (a >= b) return 1;
    return -1;
  });
  return data;
};

const getMax = (numeros) => {
  const ordenados = ordenar(numeros);
  return ordenados[numeros.length - 1];
};

const getMin = (numeros) => {
  const ordenados = ordenar(numeros);
  return ordenados[0];
};

const promedio = (numeros) => {
  let suma = 0;
  numeros.forEach((num) => (suma += num));
  return suma / numeros.length;
};

process.on('exit', (code) => {
  console.log(`El programa finalizó con código: ${code}`);
});

const args = process.argv.slice(2);

if (!args.length) {
  const error = {
    msg: 'Cadena vacía',
  };
  console.log(error);
  process.exit(-4);
}

// Aquí pasamos todos los argumentos que recibimos en la línea de comandos, a tipo 'number'
// y luego filtro los que no sean números
const numeros = args.map((num) => Number(num)).filter((arg) => !isNaN(arg));

console.log(`Argumentos después de pasarlos a number: ${numeros}`);

if (numeros.length !== args.length) {
  const error = {
    msg: 'Tipos no válidos',
    input: args,
    isNan: args.map((arg) => isNaN(Number(arg))),
  };
  console.log(error);
  process.exit(-5);
}

const datos = {
  numeros: args,
  promedio: promedio(numeros),
  minimo: getMin(numeros),
  maximo: getMax(numeros),
  ejecutable: process.execPath,
  process_id: process.pid,
};

console.log(datos);
process.exit(0);
