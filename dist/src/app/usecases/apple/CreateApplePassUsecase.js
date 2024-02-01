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
exports.CreateApplePassUsecase = void 0;
const common_1 = require("../../models/common");
const Pagination_1 = require("../../repositories/Pagination");
const ValidationError_1 = require("../../errors/ValidationError");
class CreateApplePassUsecase {
    constructor(validator, generateUniqueId, applePassRepository) {
        this.validator = validator;
        this.generateUniqueId = generateUniqueId;
        this.applePassRepository = applePassRepository;
    }
    execute(data, id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const applePass = {
                id: id !== null && id !== void 0 ? id : this.generateUniqueId(),
                expiredAt: data.expiredAt,
                token: (0, common_1.generateToken)(),
                barcodeMessage: data.barcodeMessage,
                type: data.type,
                data: data.data,
                lastUpdatedAt: null,
            };
            const validationError = this.validator.validate(applePass);
            if (validationError !== undefined) {
                throw validationError;
            }
            if (id) {
                const searchFilter = {
                    ids: [id],
                };
                const pass = yield this.applePassRepository.search(searchFilter, Pagination_1.Pagination.createSingleResult());
                if (pass.results.length > 0) {
                    throw new ValidationError_1.ValidationError("422", `Id: ${id} already exists`, "id");
                }
            }
            yield this.applePassRepository.create(applePass);
            return applePass;
        });
    }
}
exports.CreateApplePassUsecase = CreateApplePassUsecase;
//# sourceMappingURL=CreateApplePassUsecase.js.map