/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniqueId } from "../../../../models/common";
import { SubscribedDevice } from "../../../../models/apple/SubscribedDevice";

export class MongoDbSubscribedDeviceMapper {
  toDB(subscribedDevice: SubscribedDevice): any {
    return {
      _id: subscribedDevice.id,
      passId: subscribedDevice.passId,
      pushToken: subscribedDevice.pushToken,
      deviceLibraryIdentifier: subscribedDevice.deviceLibraryIdentifier,
    };
  }

  fromDB(data: any): SubscribedDevice {
    return {
      id: data._id as UniqueId,
      passId: data.passId,
      pushToken: data.pushToken,
      deviceLibraryIdentifier: data.deviceLibraryIdentifier,
    };
  }
}
