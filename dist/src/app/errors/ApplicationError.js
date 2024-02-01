"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        this.meta = {};
    }
    setMeta(meta) {
        this.meta = meta;
        return this;
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=ApplicationError.js.map