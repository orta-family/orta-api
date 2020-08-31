import 'module-alias/register';
import { PORT } from './config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import chalk from 'chalk';
import * as http from 'http';

import { createApp } from './app';


async function main() {
  console.log('Starting Orta API');

  console.log('Creating connection to db...');
  const connection = await createConnection();
  console.log(chalk.green('Success!'));

  const app = createApp();
  app.set('port', PORT);

  const server = http.createServer(app);

  server.listen(PORT);

  console.log(chalk.green(
    `${chalk.bold('Orta API')} listening on ${chalk.underline(`http://localhost:${PORT}`)}`
  ));
};

main().catch(e => {
  console.error(chalk.red('Fatal error occurred starting server!'));
  console.error(e);
  process.exit(1);
});
