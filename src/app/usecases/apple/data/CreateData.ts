import { ApplePassData, ApplePassType } from "../../../models/apple/ApplePass";

export type CreateData = {
  expiredAt: Date;
  barcodeMessage: string | null;
  type: ApplePassType;
  data: ApplePassData;
};
