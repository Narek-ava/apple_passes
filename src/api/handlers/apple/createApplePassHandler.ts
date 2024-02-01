import { Request, RequestHandler, Response } from "express";
import { CreateApplePassUsecase } from "../../../app/usecases/apple/CreateApplePassUsecase";
import { CreateData } from "../../../app/usecases/apple/data/CreateData";
import { getDataByType } from "./applePassHandlerHelper";
import { PassService } from "../../../app/services/apple/PassService";

export function createApplePassHandler(
  createApplePassUsecase: CreateApplePassUsecase,
  passService: PassService
): RequestHandler {
  return async (req: Request, res: Response) => {
    const createData: CreateData = {
      expiredAt: req.body.expiredAt,
      barcodeMessage: req.body.barcodeMessage ?? null,
      type: req.body.type,
      data: getDataByType(req.body.type, req),
    };

    const id = req.body.id ?? undefined;

    const applePass = await createApplePassUsecase.execute(createData, id);

    res.json({
      ...applePass,
      downloadUrl: passService.getDownloadUrl(applePass.id, applePass.token),
    });
  };
}
