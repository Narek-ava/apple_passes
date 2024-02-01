import { ApplePassData, ApplePassType } from "../../../app/models/apple/ApplePass";
import { Request } from "express";
import { UnhandledDataTypeError } from "../../../app/errors/apple/UnhandledDataTypeError";
import { BoardingPassData } from "../../../app/usecases/apple/data/BoardingPassData";

export function getBoardingPassData(req: Request): BoardingPassData {
  return {
    from: {
      label: req.body?.data?.from?.label ?? "",
      value: req.body?.data?.from?.value ?? "",
    },
    to: {
      label: req.body?.data?.to?.label ?? "",
      value: req.body?.data?.to?.value ?? "",
    },
    passenger: {
      label: req.body?.data?.passenger?.label ?? "",
      value: req.body?.data?.passenger?.value ?? "",
    },
    time: {
      label: req.body?.data?.time?.label ?? "",
      value: req.body?.data?.time?.value ?? "",
    },
    passengers: {
      label: req.body?.data?.passengers?.label ?? "",
      value: req.body?.data?.passengers?.value ?? "",
    },
    payToDriver: {
      label: req.body?.data?.payToDriver?.label ?? "",
      value: req.body?.data?.payToDriver?.value ?? "",
    },
  };
}

export function getDataByType(
  type: ApplePassType,
  req: Request
): ApplePassData {
  switch (type) {
    case "boardingPass":
      return getBoardingPassData(req);
    default:
      throw new UnhandledDataTypeError(`Unhandled data type: ${type}`);
  }
}
