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
exports.CreateSubscribedDeviceUsecase = void 0;
const NotFoundError_1 = require("../../errors/NotFoundError");
const Pagination_1 = require("../../repositories/Pagination");
class CreateSubscribedDeviceUsecase {
    constructor(generateUniqueId, subscribedDeviceRepository, applePassRepository) {
        this.generateUniqueId = generateUniqueId;
        this.subscribedDeviceRepository = subscribedDeviceRepository;
        this.applePassRepository = applePassRepository;
    }
    execute(data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const applePass = yield this.applePassRepository.get(data.passId);
            if (!applePass || applePass.token !== token) {
                throw new NotFoundError_1.NotFoundError();
            }
            const subscribedDeviceFilter = {
                deviceLibraryIdentifiers: [data.deviceLibraryIdentifier],
                passIds: [data.passId],
                pushTokens: [data.pushToken],
            };
            const subscribedDevice = yield this.subscribedDeviceRepository.search(subscribedDeviceFilter, Pagination_1.Pagination.createSingleResult());
            if (subscribedDevice.results.length === 0) {
                const newSubscribedDevice = {
                    id: this.generateUniqueId(),
                    passId: data.passId,
                    pushToken: data.pushToken,
                    deviceLibraryIdentifier: data.deviceLibraryIdentifier,
                };
                yield this.subscribedDeviceRepository.create(newSubscribedDevice);
            }
        });
    }
}
exports.CreateSubscribedDeviceUsecase = CreateSubscribedDeviceUsecase;
//# sourceMappingURL=CreateSubscribedDeviceUsecase.js.map