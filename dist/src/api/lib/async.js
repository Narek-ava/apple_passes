"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = void 0;
function wrapAsync(fn) {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
exports.wrapAsync = wrapAsync;
//# sourceMappingURL=async.js.map