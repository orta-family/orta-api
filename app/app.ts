import express, { Application, NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import indexRouter from './routes/index';
import errorRequestHandler from './error';

export function createApp() : Application {
  console.log('Creating express app');
  const app = express();

  console.log('Setting up middleware');
  app.use(bodyParser.json());

  console.log('Setting up routes');
  app.use('/', indexRouter);

  app.use(errorRequestHandler);

  return app;
}