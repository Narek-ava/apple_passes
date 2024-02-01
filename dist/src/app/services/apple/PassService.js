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
exports.PassService = void 0;
const node_fs_1 = require("node:fs");
const path_1 = __importDefault(require("path"));
class PassService {
    constructor(config) {
        this.config = config;
        this.config = config;
    }
    getDownloadUrl(id, token) {
        const query = token ? `?token=${token}` : "";
        return `${this.config.applePass.url}/v1/passes/${this.config.applePass.passTypeIdentifier}/${id}${query}`;
    }
    getCertificates() {
        return __awaiter(this, void 0, void 0, function* () {
            const wwdr = yield node_fs_1.promises.readFile(path_1.default.resolve("src/app/usecases/apple/passModels", "certificates", "wwdr.pem"), "utf-8");
            //todo make type
            return {
                signerCert: Buffer.from(this.config.applePass.signerCert, "base64").toString("utf-8"),
                signerKey: Buffer.from(this.config.applePass.signerKey, "base64").toString("utf-8"),
                wwdr,
                signerKeyPassphrase: this.config.applePass.signerKeyPassphrase,
            };
        });
    }
}
exports.PassService = PassService;
//# sourceMappingURL=PassService.js.map