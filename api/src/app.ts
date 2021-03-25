import express, { Application, Request, Response, NextFunction } from 'express';
// const app = express();
// const port = 3000;

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

import config from './config';
// import express from 'express';
import Logger from './loaders/logger';

async function startServer() {
  const app: Application = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

}

startServer();
