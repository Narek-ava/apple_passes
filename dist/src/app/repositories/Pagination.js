"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const defaultLimit = 25;
const unlimitedLimit = 1000000;
class Pagination {
    constructor(_limit = defaultLimit, _offset = 0) {
        this._limit = _limit;
        this._offset = _offset;
    }
    static createUnlimited() {
        return new Pagination(unlimitedLimit);
    }
    static createSingleResult() {
        return new Pagination(1);
    }
    get limit() {
        return Math.max(1, this._limit);
    }
    get offset() {
        return Math.max(0, this._offset);
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map