import { NextFunction } from "express";

export abstract class HTTPError extends Error {
  readonly statusCode!: number;
  readonly name!: string;

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export abstract class HTTPClientError extends HTTPError {}
export abstract class HTTPServerError extends HTTPError {}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = "Bad Request 🥴") {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message: string | object = "Unauthorized 👻") {
    super(message);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message: string | object = "Forbidden 🤥") {
    super(message);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = "Not found 😕") {
    super(message);
  }
}

export class HTTP409Error extends HTTPClientError {
  readonly statusCode = 409;

  constructor(message: string | object = "Data conflict found 🤪") {
    super(message);
  }
}

export class HTTP500Error extends HTTPServerError {
  readonly statusCode = 500;

  constructor(message: string | object = "Internal Server Error 😨") {
    super(message);
  }
}

export function throwError(
  next: NextFunction,
  statusCode: number,
  message?: string | object
) {
  let error: HTTPError;
  switch (statusCode) {
    case 400:
      error = new HTTP400Error(message);
      break;
    case 401:
      error = new HTTP401Error(message);
      break;
    case 403:
      error = new HTTP403Error(message);
      break;
    case 404:
      error = new HTTP404Error(message);
      break;
    case 409:
      error = new HTTP409Error(message);
      break;
    default:
      error = new HTTP500Error(message);
      break;
  }

  next(error);
}
