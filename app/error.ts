import { ENV } from './config';
import { ErrorRequestHandler } from "express";

const isDev = ENV === 'development';

interface IApiErrorOptions {
  detail?: string;
  source?: any;
};

interface IApiError {
  status: number;
  title: string;
  expose: boolean;
  options: IApiErrorOptions;
}

interface IApiErrorResponse {
  status: number;
  title: string;
  detail?: string;
  source?: any;
}

class ApiError implements IApiError {
  constructor(
    public status: number,
    public title: string,
    public expose: boolean,
    public options: IApiErrorOptions = {}
  ) {
    this.status = status;
    this.title = title;
    this.expose = expose;
    this.options = options;
  }
}

export class ValidationApiError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super(400, 'Validation Error', true, options);
  }
}

export class NotFoundApiError extends ApiError {
  constructor(options: IApiErrorOptions = {}) {
    super(404, 'Not found', true, options);
  }
}

class GenericApiErrorResponse implements IApiErrorResponse {
  status: number = 500;
  title: string = 'Server Error';
  detail: string = 'An unknown error has ocurred'
}

function parseError(error: IApiError): IApiErrorResponse {
  if (isDev || error.expose) {
    const { status, title, options } = error;
    const { detail, source } = options;
    return { status, title, detail, source };
  }

  return new GenericApiErrorResponse();
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
        res.status(406).send("Unacceptable!");
      },
    });
  } catch (e) {
    next(e);
  }
};

export default errorRequestHandler;