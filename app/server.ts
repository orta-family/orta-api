import { PORT } from './config';
import 'reflect-metadata';
import chalk from 'chalk';
import express from 'express';

async function main() {
  console.log('Starting Orta API...');
  const app = express();  

  app.use(express.json());

  app.get('/', (req, res) => res.json({ message: 'Test' }));

  app.get('/members', (req, res) => res.json({ message: 'Test' }));

  app.use((req, res) => res.status(404).json({ message: 'This is not a valid endpoint' }));

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