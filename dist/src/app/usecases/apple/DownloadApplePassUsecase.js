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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadApplePassUsecase = void 0;
const path_1 = __importDefault(require("path"));
const passkit_generator_1 = require("passkit-generator");
const NotFoundError_1 = require("../../errors/NotFoundError");
const UnhandledDataTypeError_1 = require("../../errors/apple/UnhandledDataTypeError");
const PassNotChangedError_1 = require("../../errors/apple/PassNotChangedError");
class DownloadApplePassUsecase {
    constructor(applePassRepository, passService, config) {
        this.applePassRepository = applePassRepository;
        this.passService = passService;
        this.config = config;
    }
    execute(data, throwIfNotModified = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const applePass = yield this.applePassRepository.get(data.id);
            if (!applePass || applePass.token !== data.token) {
                throw new NotFoundError_1.NotFoundError();
            }
            const lastUpdatedAtTime = applePass.lastUpdatedAt !== null ? applePass.lastUpdatedAt.getTime() : 0;
            if (throwIfNotModified && data.ifModifiedSince > lastUpdatedAtTime) {
                throw new PassNotChangedError_1.PassNotChangedError();
            }
            switch (applePass.type) {
                case "boardingPass":
                    return yield this.boardingPass(applePass);
                default:
                    throw new UnhandledDataTypeError_1.UnhandledDataTypeError(`Unhandled data type: ${applePass.type}`);
            }
        });
    }
    boardingPass(applePass) {
        return __awaiter(this, void 0, void 0, function* () {
            const certificates = yield this.passService.getCertificates();
            const pkPass = yield passkit_generator_1.PKPass.from({
                model: path_1.default.resolve("src/app/usecases/apple/passModels/boardingPassModel") +
                    "/",
                certificates: certificates,
            }, {
                serialNumber: applePass.id,
                passTypeIdentifier: this.config.applePass.passTypeIdentifier,
                teamIdentifier: this.config.applePass.teamIdentifier,
                webServiceURL: this.config.applePass.url,
                organizationName: this.config.applePass.organizationName,
                authenticationToken: applePass.token,
                voided: false,
                sharingProhibited: false,
            });
            pkPass.primaryFields.push({
                key: "from",
                label: applePass.data.from.label,
                value: applePass.data.from.value,
                changeMessage: "Origin changed to %@.",
            }, {
                key: "to",
                label: applePass.data.to.label,
                value: applePass.data.to.value,
                changeMessage: "Destination changed to %@.",
            });
            pkPass.auxiliaryFields.push({
                key: "passenger",
                label: applePass.data.passenger.label,
                value: applePass.data.passenger.value,
                changeMessage: "Passenger changed to %@.",
            });
            pkPass.secondaryFields.push({
                key: "time",
                label: applePass.data.time.label,
                value: applePass.data.time.value,
                changeMessage: "Time changed to %@.",
            }, {
                key: "passengers",
                label: applePass.data.passengers.label,
                value: applePass.data.passengers.value,
                changeMessage: "Passengers changed to %@.",
            }, {
                key: "payToDriver",
                label: applePass.data.payToDriver.label,
                value: applePass.data.payToDriver.value,
                changeMessage: "Pay To Driver changed to %@.",
            });
            pkPass.setRelevantDate(applePass.expiredAt);
            pkPass.setExpirationDate(applePass.expiredAt);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pkPass.setBarcodes({
                format: "PKBarcodeFormatQR",
                message: applePass.barcodeMessage,
                messageEncoding: "utf-8",
                altText: "Scan me",
            });
            pkPass.backFields.push({
                key: "passSourceUpdate",
                label: "update this pass",
                value: this.passService.getDownloadUrl(applePass.id, applePass.token),
            }, {
                key: "passSourceSignature",
                label: `created by ${this.config.applePass.organizationName}`,
                value: "",
            });
            return pkPass;
        });
    }
}
exports.DownloadApplePassUsecase = DownloadApplePassUsecase;
//# sourceMappingURL=DownloadApplePassUsecase.js.map