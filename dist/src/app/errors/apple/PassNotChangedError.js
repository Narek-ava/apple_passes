"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassNotChangedError = void 0;
const ApplicationError_1 = require("../ApplicationError");
class PassNotChangedError extends ApplicationError_1.ApplicationError {
    constructor(message = "Pass has not been changed", code = "pass_has_not_been_changed") {
        super(code, message);
    }
}
exports.PassNotChangedError = PassNotChangedError;
//# sourceMappingURL=PassNotChangedError.js.map