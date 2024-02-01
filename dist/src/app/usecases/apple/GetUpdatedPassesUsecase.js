"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUpdatedPassesUsecase = void 0;
const Pagination_1 = require("../../repositories/Pagination");
class GetUpdatedPassesUsecase {
    constructor(subscribedDeviceRepository, applePassRepository) {
        this.subscribedDeviceRepository = subscribedDeviceRepository;
        this.applePassRepository = applePassRepository;
    }
    execute(deviceLibraryIdentifier, lastUpdatedAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribedDevicesFilter = {
                deviceLibraryIdentifiers: [deviceLibraryIdentifier],
            };
            const subscribedDevices = yield this.subscribedDeviceRepository.search(subscribedDevicesFilter, Pagination_1.Pagination.createUnlimited());
            const passIds = subscribedDevices.results.map((subscribedDevice) => {
                return subscribedDevice.passId;
            });
            const passFilter = {
                ids: passIds,
                lastUpdatedAt: new Date(lastUpdatedAt),
            };
            const updatedPasses = yield this.applePassRepository.search(passFilter, Pagination_1.Pagination.createUnlimited());
            return updatedPasses.results.map((updatedPass) => {
                return updatedPass.id;
            });
        });
    }
}
exports.GetUpdatedPassesUsecase = GetUpdatedPassesUsecase;
//# sourceMappingURL=GetUpdatedPassesUsecase.js.map