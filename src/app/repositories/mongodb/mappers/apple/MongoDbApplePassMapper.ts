/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplePass } from "../../../../models/apple/ApplePass";
import { UniqueId } from "../../../../models/common";

export class MongoDbApplePassMapper {
  toDB(applePass: ApplePass): any {
    return {
      _id: applePass.id,
      expiredAt: applePass.expiredAt,
      token: applePass.token,
      barcodeMessage: applePass.barcodeMessage,
      type: applePass.type,
      data: applePass.data,
      lastUpdatedAt: applePass.lastUpdatedAt,
    };
  }

  fromDB(data: any): ApplePass {
    return {
      id: data._id as UniqueId,
      expiredAt: data.expiredAt ? new Date(data.expiredAt) : data.expiredAt,
      token: data.token,
      barcodeMessage: data.barcodeMessage,
      type: data.type,
      data: data.data,
      lastUpdatedAt: data.expiredAt ? new Date(data.expiredAt) : data.expiredAt,
    };
  }
}
