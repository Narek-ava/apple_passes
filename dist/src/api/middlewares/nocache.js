"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nocache = void 0;
function nocache() {
    return (req, res, next) => {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Expires", "-1");
        res.setHeader("Pragma", "no-cache");
        next();
    };
}
exports.nocache = nocache;
//# sourceMappingURL=nocache.js.map