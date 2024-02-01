"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const ApplicationError_1 = require("./ApplicationError");
class NotFoundError extends ApplicationError_1.ApplicationError {
    constructor(code = "not_found", message = "Not found") {
        super(code, message);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map