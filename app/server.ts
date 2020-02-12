import { PORT } from './config';
import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from "typeorm";
import chalk from 'chalk';

import indexRouter from './routes/index';

async function main() {
  console.log('Starting Orta API');

  console.log('Creating connection to db...');
  const connection = await createConnection();
  console.log(chalk.green('Success!'));

  console.log('Creating express app');
  const app = express();  

  console.log('Setting up middleware');
  app.use(bodyParser.json());

  console.log('Setting up routes');
  app.use('/', indexRouter);
  console.log(chalk.green('Success!'));

  app.listen(PORT, () => {
    console.log(chalk.green(
      `${chalk.bold('Orta API')} listening on ${chalk.underline(`http://localhost:${PORT}`)}`
    ));
  });
};

main().catch(e => {
  console.error("Fatal error occurred starting server!");
  console.error(e);
  process.exit(101);
});