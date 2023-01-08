import { exec } from 'child_process';
// import { stderr, stdout } from 'process';

const comando1 = 'ls -lh';
const comando2 = 'find /';
const comando3 = 'node desafio.js 32 54 43';

exec(comando1, (err, stdout, stderr) => {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }

  if (stderr) {
    console.log(`StdErr: ${stderr}`);
    return;
  }

  console.log(stdout);
});
