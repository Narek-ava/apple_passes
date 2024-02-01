import { NextFunction, Request, RequestHandler, Response } from "express";

export function nocache(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Expires", "-1");
    res.setHeader("Pragma", "no-cache");

    next();
  };
}
