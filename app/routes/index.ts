import express from 'express';
import restRouter from './rest/index';
import { ApiOkResponse, NotFoundApiError } from '~/response';

const router = express.Router();

router.use('/rest', restRouter);

router.get('/healthz', (res, req, next) => res.json(new ApiOkResponse({ detail: 'Healthy' })));

router.use((req, res, next) => next(new NotFoundApiError({ detail: 'This is not a valid endpoint' })));

export default router;