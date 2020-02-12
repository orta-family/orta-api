import express from 'express';
import restRouter from './rest';

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Test' }));

router.use('/rest', restRouter);

router.use((req, res) => res.status(404).json({ message: 'This is not a valid endpoint' }));

export default router;