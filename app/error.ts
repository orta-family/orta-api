import { ENV } from './config';
import { ErrorRequestHandler } from "express";
import chalk from 'chalk';

const isDev = ENV === "development";

interface ParsedError {
  message: String;
  status: number;
  detail: any;
}

interface OrtaError {
  message: string;
  status: string;
  detail: any;
}

function parseError(error: OrtaError): ParsedError {
  /*
   * Because an error may contain confidential information or information that
   * might help attackers, by default we don't output the error message at all.
   * You should override this for specific classes of errors below.
   */

  const { status: code, detail } = error;
  const codeAsFloat = parseInt(code, 10);
  const httpCode =
    isFinite(codeAsFloat) && codeAsFloat >= 400 && codeAsFloat < 600
      ? codeAsFloat
      : 500;

  const result = {
    message: "An unknown error occurred",
    status: httpCode,
    detail,
  };

  if (isDev) {
    console.error('ERROR: ', result);
  }

  return result;
}

const errorRequestHandler: ErrorRequestHandler = (error, _req, res, next) => {
  try {
    const parsedError = parseError(error);
    const errorMessageString = `ERROR: ${parsedError.message}`;

    if (res.headersSent) {
      console.error(errorMessageString);
      res.end();
      return;
    }

    res.status(parsedError.status);

    res.format({
      "text/plain": function() {
        res.send(errorMessageString);
      },

      "application/json": function() {
        res.send({ errors: [{ message: errorMessageString }] });
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