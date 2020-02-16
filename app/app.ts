import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import chalk from 'chalk';

import indexRouter from './routes/index';

export function createApp() : Application {
  console.log('Creating express app');
  const app = express();

  console.log('Setting up middleware');
  app.use(bodyParser.json());

  console.log('Setting up routes');
  app.use('/', indexRouter);

  return app;
}

// app.listen(PORT, () => {
//   console.log(chalk.green(
//     `${chalk.bold('Orta API')} listening on ${chalk.underline(`http://localhost:${PORT}`)}`
//   ));
// });