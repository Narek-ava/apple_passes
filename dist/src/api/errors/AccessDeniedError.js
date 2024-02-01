"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
const ApplicationError_1 = require("../../app/errors/ApplicationError");
class AccessDeniedError extends ApplicationError_1.ApplicationError {
    constructor() {
        super("access_denied", "Access denied");
    }
}
exports.AccessDeniedError = AccessDeniedError;
//# sourceMappingURL=AccessDeniedError.js.map