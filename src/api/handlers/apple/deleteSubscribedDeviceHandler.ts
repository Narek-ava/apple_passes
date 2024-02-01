import { Request, RequestHandler, Response } from "express";
import { DeleteSubscribedDeviceUsecase } from "../../../app/usecases/apple/DeleteSubscribedDeviceUsecase";

export function deleteSubscribedDeviceHandler(
  deleteSubscribedDeviceUseCase: DeleteSubscribedDeviceUsecase
): RequestHandler {
  return async (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace("ApplePass ", "") ?? "";
    const passId = req.params.passId;
    const deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;

    await deleteSubscribedDeviceUseCase.execute(
      passId,
      deviceLibraryIdentifier,
      token
    );

    res.status(200);
  };
}
