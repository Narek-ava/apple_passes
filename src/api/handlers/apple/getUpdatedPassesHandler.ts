import { Request, RequestHandler, Response } from "express";
import { GetUpdatedPassesUsecase } from "../../../app/usecases/apple/GetUpdatedPassesUsecase";

export function getUpdatedPassesHandler(
  getUpdatedPassesUsecase: GetUpdatedPassesUsecase
): RequestHandler {
  return async (req: Request, res: Response) => {
    const deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
    const passesUpdatedSince = req.query.passesUpdatedSince;

    const lastUpdatedAt: number = passesUpdatedSince
      ? Date.parse(passesUpdatedSince as string)
      : 0;

    const updatedPasses = await getUpdatedPassesUsecase.execute(
      deviceLibraryIdentifier,
      lastUpdatedAt
    );

    if (updatedPasses.length > 0) {
      res.status(200).json({
        serialNumbers: updatedPasses,
        lastUpdated: new Date(),
      });
    } else {
      res.status(204).json();
    }
  };
}
