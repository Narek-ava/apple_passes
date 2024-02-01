"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationResult = void 0;
const ValidationError_1 = require("../errors/ValidationError");
function parseValidationResult(validationResult) {
    var _a, _b, _c;
    const errorDetails = (_b = (_a = validationResult.error) === null || _a === void 0 ? void 0 : _a.details[0]) !== null && _b !== void 0 ? _b : undefined;
    if (errorDetails === undefined) {
        return undefined;
    }
    return new ValidationError_1.ValidationError(errorDetails.type, errorDetails.message, (_c = errorDetails.context) === null || _c === void 0 ? void 0 : _c.label);
}
exports.parseValidationResult = parseValidationResult;
//# sourceMappingURL=validator.js.map