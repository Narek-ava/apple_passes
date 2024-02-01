"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledDataTypeError = void 0;
const ApplicationError_1 = require("../ApplicationError");
class UnhandledDataTypeError extends ApplicationError_1.ApplicationError {
    constructor(message = "Unhandled data type", code = "unhandled_data_type") {
        super(code, message);
    }
}
exports.UnhandledDataTypeError = UnhandledDataTypeError;
//# sourceMappingURL=UnhandledDataTypeError.js.map