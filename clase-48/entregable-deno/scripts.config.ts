import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts';

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: 'deno run --allow-read --allow-net src/index.ts',
      desc: 'Inicia la aplicación',
    },
  },
};

export default config;
