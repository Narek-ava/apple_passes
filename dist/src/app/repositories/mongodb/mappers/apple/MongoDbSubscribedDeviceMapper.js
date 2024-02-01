"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbSubscribedDeviceMapper = void 0;
class MongoDbSubscribedDeviceMapper {
    toDB(subscribedDevice) {
        return {
            _id: subscribedDevice.id,
            passId: subscribedDevice.passId,
            pushToken: subscribedDevice.pushToken,
            deviceLibraryIdentifier: subscribedDevice.deviceLibraryIdentifier,
        };
    }
    fromDB(data) {
        return {
            id: data._id,
            passId: data.passId,
            pushToken: data.pushToken,
            deviceLibraryIdentifier: data.deviceLibraryIdentifier,
        };
    }
}
exports.MongoDbSubscribedDeviceMapper = MongoDbSubscribedDeviceMapper;
//# sourceMappingURL=MongoDbSubscribedDeviceMapper.js.map