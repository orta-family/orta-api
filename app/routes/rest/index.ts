import express from 'express';
import membersRouter from './members';
// import { CrudRouter } from '~/routes/Crud';
// import { Member } from '~/entity/Member';

const router = express.Router();

// const crud = new CrudRouter(Member);

router.use('/members', membersRouter);

export default router;