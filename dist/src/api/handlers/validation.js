"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortingValidationSchema = exports.paginationValidationSchema = exports.stringValuesValidationSchema = exports.uniqueIdsValidationSchema = exports.uniqueIdValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.uniqueIdValidationSchema = joi_1.default.string().trim().min(1).max(50);
exports.uniqueIdsValidationSchema = joi_1.default.array().items(exports.uniqueIdValidationSchema);
const stringValuesValidationSchema = (validValues) => joi_1.default.array().items(joi_1.default.string().valid(...validValues));
exports.stringValuesValidationSchema = stringValuesValidationSchema;
exports.paginationValidationSchema = joi_1.default.object({
    limit: joi_1.default.number().default(25),
    offset: joi_1.default.number().default(0),
}).optional();
exports.sortingValidationSchema = joi_1.default.object({
    field: joi_1.default.string().trim(),
    direction: joi_1.default.string().trim().valid("asc", "desc").default("asc"),
}).optional();
//# sourceMappingURL=validation.js.map