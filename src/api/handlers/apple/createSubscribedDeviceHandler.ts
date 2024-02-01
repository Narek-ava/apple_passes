import { Request, RequestHandler, Response } from "express";
import { CreateSubscribedDevice } from "../../../app/usecases/apple/data/CreateSubscribedDevice";
import { CreateSubscribedDeviceUsecase } from "../../../app/usecases/apple/CreateSubscribedDeviceUsecase";

export function createSubscribedDeviceHandler(
  createSubscribedDeviceUsecase: CreateSubscribedDeviceUsecase
): RequestHandler {
  return async (req: Request, res: Response) => {
    const registerDevice: CreateSubscribedDevice = {
      passId: req.params.passId,
      pushToken: req.body.pushToken,
      deviceLibraryIdentifier: req.params.deviceLibraryIdentifier,
    };

    const token = req.headers.authorization?.replace("ApplePass ", "") ?? "";

    await createSubscribedDeviceUsecase.execute(registerDevice, token);

    res.status(201);
  };
}
