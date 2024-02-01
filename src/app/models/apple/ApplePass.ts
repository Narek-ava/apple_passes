import { UniqueId } from "../common";
import { BoardingPassData } from "../../usecases/apple/data/BoardingPassData";

export type ApplePassType = "boardingPass";
export const availableApplePassTypes: ApplePassType[] = ["boardingPass"];

export type ApplePassData = BoardingPassData;

export interface ApplePass {
  id: UniqueId;
  expiredAt: Date;
  token: string;
  barcodeMessage: string | null;
  type: ApplePassType;
  data: ApplePassData;
  lastUpdatedAt: Date | null;
}
