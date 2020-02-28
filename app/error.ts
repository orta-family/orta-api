import { ENV } from './config';
import { ErrorRequestHandler } from "express";

const isDev = ENV === 'development';

interface ApiError {
  status: number;
  title: string;
  detail?: string;
  expose: boolean;
  source?: any;
}

interface PublicApiError {
  status: number;
  title: string;
  detail?: string;
  source?: any;
}

export class ValidationApiError implements ApiError {
  status: number = 400;
  title: string = 'Validation Error';
  expose: boolean = true;

  constructor(public source: any) {
    this.source = source;
  }
}

class GenericApiError implements PublicApiError {
  status: number = 500;
  title: string = 'Server Error';
  detail: string = 'An unknown error has ocurred'
}

function parseError(error: ApiError): PublicApiError {
  if (isDev || error.expose) {
    const { status, title, detail, source } = error;
    return { status, title, detail, source };
  }

  return new GenericApiError();
}

const errorRequestHandler: ErrorRequestHandler = (error, _req, res, next) => {
  try {
    const parsedError = parseError(error);

    res.status(parsedError.status);

    res.format({

      "application/json": function() {
        res.send({ errors: [parsedError] });
      },

      default: function() {
        // log the request and respond with 406
        res.status(406).send("Unacceptable!");
      },
    });
  } catch (e) {
    next(e);
  }
};

export default errorRequestHandler;