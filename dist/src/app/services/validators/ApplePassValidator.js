"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePassValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../lib/validator");
const ApplePass_1 = require("../../models/apple/ApplePass");
const UnhandledDataTypeError_1 = require("../../errors/apple/UnhandledDataTypeError");
const Joi = joi_1.default;
class ApplePassValidator {
    constructor() {
        this.boardingPassValidation = Joi.object({
            from: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
            to: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
            passenger: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
            time: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
            passengers: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
            payToDriver: Joi.object({
                label: Joi.string().max(500).required(),
                value: Joi.string().max(500).required(),
            }).required(),
        }).required();
    }
    getDataValidator(type) {
        switch (type) {
            case "boardingPass":
                return this.boardingPassValidation;
            default:
                throw new UnhandledDataTypeError_1.UnhandledDataTypeError(`Unhandled data type: ${type}`);
        }
    }
    validate(applePass) {
        return (0, validator_1.parseValidationResult)(Joi.object({
            id: Joi.string().optional(),
            expiredAt: Joi.date().required(),
            token: Joi.string().required(),
            barcodeMessage: Joi.string().optional(),
            type: Joi.string().valid(...ApplePass_1.availableApplePassTypes),
            data: this.getDataValidator(applePass.type),
            lastUpdatedAt: Joi.date().allow(null).required(),
        }).validate(applePass, {
            abortEarly: true,
        }));
    }
}
exports.ApplePassValidator = ApplePassValidator;
//# sourceMappingURL=ApplePassValidator.js.map