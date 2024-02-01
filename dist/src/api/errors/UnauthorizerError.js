"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const ApplicationError_1 = require("../../app/errors/ApplicationError");
class UnauthorizedError extends ApplicationError_1.ApplicationError {
    constructor() {
        super("unauthorized", "Unauthorized");
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizerError.js.map