"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSearchQuery = void 0;
function prepareSearchQuery(query) {
    if (query.indexOf("%") === -1) {
        return query;
    }
    return {
        $regex: new RegExp(`^${query.replace(/%/g, ".*")}$`, "i"),
    };
}
exports.prepareSearchQuery = prepareSearchQuery;
//# sourceMappingURL=query.js.map