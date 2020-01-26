#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { makeApp, getShutdownActions } from './app';

async function main() {
  // Setup env
  dotenv.config();

  // Create our HTTP server
  const httpServer = createServer();

  // Make our application (loading all the middleware, etc)
  const app = await makeApp({ httpServer });

  // Add our application to our HTTP server
  httpServer.addListener('request', app);

  // And finally, we open the listen port
  const PORT = parseInt(process.env.PORT || '', 10) || 3000;
  httpServer.listen(PORT, () => {
    const address = httpServer.address();
    const actualPort =
      typeof address === 'string'
        ? address
        : address && address.port
        ? String(address.port)
        : String(PORT);
    console.log();
    console.log(
      chalk.green(
        `${chalk.bold('Orta API')} listening on port ${chalk.bold(actualPort)}`
      )
    );
    console.log();
    console.log(
      `  Site:     ${chalk.bold.underline(`http://localhost:${actualPort}`)}`
    );
    console.log(
      `  GraphiQL: ${chalk.bold.underline(
        `http://localhost:${actualPort}/graphiql`
      )}`
    );
    console.log();
  });

  // Nodemon SIGUSR2 handling
  // const shutdownActions = getShutdownActions(app);
  // shutdownActions.push(() => {
  //   httpServer.close();
  // });
}

main().catch(e => {
  console.error('Fatal error occurred starting server!');
  console.error(e);
  process.exit(101);
});