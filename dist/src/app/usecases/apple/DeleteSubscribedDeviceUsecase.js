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
exports.DeleteSubscribedDeviceUsecase = void 0;
const NotFoundError_1 = require("../../errors/NotFoundError");
const Pagination_1 = require("../../repositories/Pagination");
class DeleteSubscribedDeviceUsecase {
    constructor(subscribedDeviceRepository, applePassRepository) {
        this.subscribedDeviceRepository = subscribedDeviceRepository;
        this.applePassRepository = applePassRepository;
    }
    execute(passId, deviceLibraryIdentifier, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const applePass = yield this.applePassRepository.get(passId);
            if (!applePass || applePass.token !== token) {
                throw new NotFoundError_1.NotFoundError();
            }
            const subscribedDeviceFilter = {
                deviceLibraryIdentifiers: [deviceLibraryIdentifier],
                passIds: [passId],
            };
            const subscribedDevices = yield this.subscribedDeviceRepository.search(subscribedDeviceFilter, Pagination_1.Pagination.createUnlimited());
            subscribedDevices.results.map((subscribedDevice) => __awaiter(this, void 0, void 0, function* () {
                yield this.subscribedDeviceRepository.delete(subscribedDevice.id);
            }));
        });
    }
}
exports.DeleteSubscribedDeviceUsecase = DeleteSubscribedDeviceUsecase;
//# sourceMappingURL=DeleteSubscribedDeviceUsecase.js.map