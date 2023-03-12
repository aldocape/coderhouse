import { config } from '../../deps.ts';

const { PORT } = config();

export default {
  PORT: PORT ? Number(PORT) : 8080,
};
