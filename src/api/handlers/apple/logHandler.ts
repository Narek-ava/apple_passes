import { Request, RequestHandler, Response } from "express";
import { Logger } from "winston";

export function logHandler(logger: Logger): RequestHandler {
  return async (req: Request, res: Response) => {
    //todo
    console.log("logStart", req.body.logs.join(", "), "log end");
    res.status(200);
  };
}
