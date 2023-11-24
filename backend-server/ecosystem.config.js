/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.production.env') });

module.exports = {
  apps: [
    {
      name: 'rec-catalogue-client', // Name of your Nuxt app
      exec_mode: 'fork',
      script: 'bun',
      cwd: '../frontend-client',
      args: '.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 4002,
      },
    },
    {
      name: 'rec-catalogue-server', // Name of your NestJS app
      exec_mode: 'fork',
      script: 'dist/main.js', // Path to compiled NestJS entry file
      env: {
        ...process.env,
        NODE_ENV: 'production',
      },
    },
  ],
};
