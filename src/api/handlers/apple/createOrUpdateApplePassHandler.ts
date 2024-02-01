import { Request, RequestHandler, Response } from "express";
import { UpdateApplePassUsecase } from "../../../app/usecases/apple/UpdateApplePassUsecase";
import { UpdateData } from "../../../app/usecases/apple/data/UpdateData";
import { getDataByType } from "./applePassHandlerHelper";
import { CreateApplePassUsecase } from "../../../app/usecases/apple/CreateApplePassUsecase";
import { PassService } from "../../../app/services/apple/PassService";
import { ApplePassFilter } from "../../../app/repositories/filters/apple/ApplePassFilter";
import { Pagination } from "../../../app/repositories/Pagination";
import { CreateData } from "../../../app/usecases/apple/data/CreateData";
import { ApplePassRepository } from "../../../app/repositories/apple/ApplePassRepository";
import { ApplePass } from "../../../app/models/apple/ApplePass";

export function createOrUpdateApplePassHandler(
  createApplePassUsecase: CreateApplePassUsecase,
  updateApplePassUsecase: UpdateApplePassUsecase,
  applePassRepository: ApplePassRepository,
  passService: PassService
): RequestHandler {
  return async (req: Request, res: Response) => {
    const id: string = req.body.id;

    const updateData: UpdateData = {
      expiredAt: req.body.expiredAt,
      barcodeMessage: req.body.barcodeMessage ?? null,
      type: req.body.type,
      data: getDataByType(req.body.type, req),
    };

    const createData: CreateData = {
      expiredAt: req.body.expiredAt,
      barcodeMessage: req.body.barcodeMessage ?? null,
      type: req.body.type,
      data: getDataByType(req.body.type, req),
    };

    const searchFilter: ApplePassFilter = {
      ids: [id],
    };

    const searchResult = await applePassRepository.search(
      searchFilter,
      Pagination.createSingleResult()
    );

    let applePass: ApplePass;
    let isNew = false;

    if (searchResult.results.length > 0) {
      applePass = await updateApplePassUsecase.execute(id, updateData);
    } else {
      applePass = await createApplePassUsecase.execute(createData, id);
      isNew = true;
    }

    res.json({
      ...applePass,
      isNew,
      downloadUrl: passService.getDownloadUrl(applePass.id, applePass.token),
    });
  };
}
