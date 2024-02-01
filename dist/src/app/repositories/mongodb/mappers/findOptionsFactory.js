"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFindOptions = void 0;
function createFindOptions(query) {
    const options = {};
    if (query.pagination !== undefined) {
        options.skip = query.pagination.offset;
        options.limit = query.pagination.limit;
    }
    if (query.sorting !== undefined) {
        options.sort = {
            [query.sorting.field]: query.sorting.direction === "asc" ? 1 : -1,
        };
    }
    return options;
}
exports.createFindOptions = createFindOptions;
//# sourceMappingURL=findOptionsFactory.js.map