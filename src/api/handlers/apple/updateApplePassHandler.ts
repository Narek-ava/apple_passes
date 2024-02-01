import { Request, RequestHandler, Response } from "express";
import { UpdateApplePassUsecase } from "../../../app/usecases/apple/UpdateApplePassUsecase";
import { UpdateData } from "../../../app/usecases/apple/data/UpdateData";
import { getDataByType } from "./applePassHandlerHelper";

export function updateApplePassHandler(
  updateApplePassUsecase: UpdateApplePassUsecase
): RequestHandler {
  return async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const updateData: UpdateData = {
      expiredAt: req.body.expiredAt,
      barcodeMessage: req.body.barcodeMessage ?? null,
      type: req.body.type,
      data: getDataByType(req.body.type, req),
    };

    const result = await updateApplePassUsecase.execute(id, updateData);

    res.json(result);
  };
}
