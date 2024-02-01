"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const ApplicationError_1 = require("./ApplicationError");
class ValidationError extends ApplicationError_1.ApplicationError {
    constructor(code, message, field = undefined) {
        super(code, message);
        this.code = code;
        this.message = message;
        this.field = field;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map