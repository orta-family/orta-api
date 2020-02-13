import express from 'express';
import membersRouter from './members';

const router = express.Router();

router.use('/members', membersRouter);

export default router;