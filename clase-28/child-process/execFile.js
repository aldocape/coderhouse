import { execFile } from 'child_process';
// import { stderr, stdout } from 'process';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = __dirname + '/leer.txt';

console.log(__dirname + '/leer.txt');

execFile(scriptPath, (err, stdout, stderr) => {
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
