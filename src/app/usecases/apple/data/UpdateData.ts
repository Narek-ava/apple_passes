import { ApplePassData, ApplePassType } from "../../../models/apple/ApplePass";

export type UpdateData = {
  expiredAt: Date;
  barcodeMessage: string | null;
  type: ApplePassType;
  data: ApplePassData;
};
