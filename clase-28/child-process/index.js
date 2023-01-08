console.log(`Directorio actual de trabajo: ${process.cwd()}`);
console.log(`ID del proceso actual: ${process.pid}`);
console.log(`Versión de NodeJS corriendo: ${process.version}`);
console.log(`Nombre del proceso: ${process.title}`);
console.log(`Sistema operativo: ${process.platform}`);
console.log(`Uso de memoria: ${JSON.stringify(process.memoryUsage())}`);

// Finalizo el proceso de node con una manera no 'limpia' sino con código de error
// process.exit(1);
// process.exit(2);

// El process.on no se ejecuta si yo elijo intencionalmente terminar el proceso
process.on('beforeExit', (code) => {
  console.log(`beforeExit ==> El proceso terminó con código ${code}`);
});

process.on('exit', (code) => {
  console.log(`exit ==> El proceso terminó con código ${code}`);
});

// process.exit(3);

// throw new Error('Error del sistema');

process.on('uncaughtException', (err) => {
  // Es recomendable en una aplicación en producción, dentro de esta lógica meter la creación de un log en el servidor
  // o enviar un mail, o similar, para que avise al desarrollador si hubo una falla, y el detalle de la misma
  console.log(`UnCaught Exception: ${err.message}\n\n`);
  console.log(`Error stack: ${err.stack}`);
  process.exit(1);
});

console.log('Ejecutando algo...');
// throw new Error('Mensaje de error');

// process.stdout funciona muy similar a console.log
const myCls = (mensaje) => {
  process.stdout.write(mensaje + '\n');
};

myCls('ID del proceso:');
myCls(process.pid);
myCls(`Directorio actual de trabajo: ${process.cwd()}`);
