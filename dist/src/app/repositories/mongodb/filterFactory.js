"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilter = void 0;
function createFilter(id, lastUpdatedAt) {
    const query = { _id: id };
    if (lastUpdatedAt !== undefined) {
        query["audit.updatedAt"] = new Date(lastUpdatedAt);
    }
    return query;
}
exports.createFilter = createFilter;
//# sourceMappingURL=filterFactory.js.map