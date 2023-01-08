module.exports = {
  apps: [
    {
      name: 'aldo1',
      script: 'dist/index.js',
      exec_mode: 'cluster',
      watch: true,
      autorestart: true,
      instances: 'max',
    },
  ],
};
