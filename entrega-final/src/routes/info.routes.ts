import { Router } from 'express';

import config from '../config';
import os from 'os';

const numCPUs = os.cpus().length;

const info = {
  args: config.ARGS,
  platform: process.platform,
  nodeversion: process.version,
  memory: JSON.stringify(process.memoryUsage().rss),
  execPath: config.ARGV._[0],
  proyectPath: process.cwd(),
  pid: process.pid,
  numCPUs,
};

const router = Router();

// Incorporación del endpoint /info para mostrar datos de variable global 'process'
router.get('/', (req, res) => {
  res.render('info', { info });
});

export default router;
