"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbApplePassMapper = void 0;
class MongoDbApplePassMapper {
    toDB(applePass) {
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
    fromDB(data) {
        return {
            id: data._id,
            expiredAt: data.expiredAt ? new Date(data.expiredAt) : data.expiredAt,
            token: data.token,
            barcodeMessage: data.barcodeMessage,
            type: data.type,
            data: data.data,
            lastUpdatedAt: data.expiredAt ? new Date(data.expiredAt) : data.expiredAt,
        };
    }
}
exports.MongoDbApplePassMapper = MongoDbApplePassMapper;
//# sourceMappingURL=MongoDbApplePassMapper.js.map