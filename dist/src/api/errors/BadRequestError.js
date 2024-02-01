"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const ValidationError_1 = require("../../app/errors/ValidationError");
class BadRequestError extends ValidationError_1.ValidationError {
    constructor() {
        super("bad_request", "Bad request");
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map