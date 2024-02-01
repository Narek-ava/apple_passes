import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { UnauthorizedError } from "../errors/UnauthorizerError";
import { ApplicationError } from "../../app/errors/ApplicationError";
import { ValidationError } from "../../app/errors/ValidationError";
import { AccessDeniedError } from "../errors/AccessDeniedError";
import { NotFoundError } from "../../app/errors/NotFoundError";

const internalServerErrorCode = "internal_server_error";
const internalServerError = "Internal server error";

export function createErrorHandler(logger: Logger) {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    if (err instanceof UnauthorizedError) {
      status = 401;
    } else if (err instanceof AccessDeniedError) {
      status = 403;
    } else if (err instanceof NotFoundError) {
      status = 404;
    } else if (err instanceof ApplicationError) {
      const { message, meta: context } = err;
      logger.error({ message, context });
    } else {
      logger.error(err.message ?? internalServerError);
    }

    const error: { code: string; message: string; field?: string } = {
      code:
        err instanceof ApplicationError ? err.code : internalServerErrorCode,
      message:
        err instanceof ApplicationError ? err.message : internalServerError,
    };
    if (err instanceof ValidationError) {
      status = 422;
      error.field = err.field;
    }

    res.status(status);
    res.json({
      errors: [error],
    });

    next(err);
  };
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404);
  res.json({
    errors: [
      {
        code: "not_found",
        message: "Resource not found",
      },
    ],
  });
}
