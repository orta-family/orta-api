import express, { NextFunction, Request, Response } from 'express';
import restRouter from './rest/index';
import { ApiOkResponse, NotFoundApiError } from '~/response';

const router = express.Router();

router.use('/rest', restRouter);

router.get('/healthz', (req: Request, res: Response) => res.json(new ApiOkResponse({ detail: 'Healthy' })));

router.use((req: Request, res: Response, next: NextFunction) => next(
  new NotFoundApiError({ detail: 'This is not a valid endpoint' })
));

export default router;