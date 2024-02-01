import { Optional } from "../../models/common";
import BaseJoi from "joi";
import { ValidationError } from "../../errors/ValidationError";
import { parseValidationResult } from "../../lib/validator";
import {
  ApplePass,
  ApplePassType,
  availableApplePassTypes,
} from "../../models/apple/ApplePass";
import { UnhandledDataTypeError } from "../../errors/apple/UnhandledDataTypeError";

const Joi = BaseJoi;

export class ApplePassValidator {
  boardingPassValidation = Joi.object({
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

  getDataValidator(type: ApplePassType) {
    switch (type) {
      case "boardingPass":
        return this.boardingPassValidation;
      default:
        throw new UnhandledDataTypeError(`Unhandled data type: ${type}`);
    }
  }

  validate(applePass: Readonly<ApplePass>): Optional<ValidationError> {
    return parseValidationResult(
      Joi.object({
        id: Joi.string().optional(),
        expiredAt: Joi.date().required(),
        token: Joi.string().required(),
        barcodeMessage: Joi.string().optional(),
        type: Joi.string().valid(...availableApplePassTypes),
        data: this.getDataValidator(applePass.type),
        lastUpdatedAt: Joi.date().allow(null).required(),
      }).validate(applePass, {
        abortEarly: true,
      })
    );
  }
}
