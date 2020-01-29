import { PORT } from './config';
import express from 'express';

const app = express();

const main = async () => {
  app.use(express.json());

  app.get('/', (req, res) => res.json({ message: 'Test' }));

  app.use((req, res) => res.status(404).json({ message: 'This is not a valid endpoint' }));

  app.listen(PORT, () => {
    console.log(`Orta API listening on http://localhost:${PORT}`);
  });
};

main();