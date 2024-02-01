"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UpdateApplePassUsecase = void 0;
const Pagination_1 = require("../../repositories/Pagination");
const apn = __importStar(require("apn"));
const NotFoundError_1 = require("../../errors/NotFoundError");
class UpdateApplePassUsecase {
    constructor(validator, applePassRepository, subscribedDeviceRepository, config) {
        this.validator = validator;
        this.applePassRepository = applePassRepository;
        this.subscribedDeviceRepository = subscribedDeviceRepository;
        this.config = config;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchFilter = {
                ids: [id],
            };
            const searchResult = yield this.applePassRepository.search(searchFilter, Pagination_1.Pagination.createSingleResult());
            if (searchResult.results.length === 0) {
                throw new NotFoundError_1.NotFoundError();
            }
            const applePass = searchResult.results[0];
            const updateData = {
                id: id,
                expiredAt: data.expiredAt,
                token: applePass.token,
                barcodeMessage: data.barcodeMessage,
                type: data.type,
                data: data.data,
                lastUpdatedAt: new Date(),
            };
            const validationError = this.validator.validate(updateData);
            if (validationError !== undefined) {
                throw validationError;
            }
            yield this.applePassRepository.update(updateData);
            const subscribedDevicesFilter = {
                passIds: [applePass.id],
            };
            const devicesToBeNotified = yield this.subscribedDeviceRepository.search(subscribedDevicesFilter, Pagination_1.Pagination.createUnlimited());
            devicesToBeNotified.results.map((deviceToBeNotified) => {
                //todo add job
                this.notify(deviceToBeNotified.pushToken);
            });
            return updateData;
        });
    }
    notify(deviceToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                token: {
                    key: Buffer.from(this.config.applePass.authKey, "base64").toString("utf-8"),
                    keyId: this.config.applePass.apnKeyId,
                    teamId: this.config.applePass.apnTeamId,
                },
                production: true,
            };
            const apnProvider = new apn.Provider(options);
            const note = new apn.Notification();
            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = 3;
            note.sound = "ping.aiff";
            note.alert = "You have a new message";
            note.topic = this.config.applePass.passTypeIdentifier;
            yield apnProvider.send(note, deviceToken);
        });
    }
}
exports.UpdateApplePassUsecase = UpdateApplePassUsecase;
//# sourceMappingURL=UpdateApplePassUsecase.js.map