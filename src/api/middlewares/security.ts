import { NextFunction, Request, RequestHandler, Response } from "express";
import { AccessDeniedError } from "../errors/AccessDeniedError";

export function authorizationMiddleware(tokenSecret: string): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== tokenSecret) {
      throw new AccessDeniedError();
    }

    return next();
  };
}
