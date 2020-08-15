import express from 'express';
import restRouter from './rest/index';
import { NotFoundApiError } from '~/error';

const router = express.Router();

router.use('/rest', restRouter);

router.use((req, res, next) => next(new NotFoundApiError({ detail: 'This is not a valid endpoint' })));

export default router;