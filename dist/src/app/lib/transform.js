"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArrayToMap = void 0;
function transformArrayToMap(values, transformFunction) {
    return Object.assign({}, ...values.map((value) => transformFunction(value)));
}
exports.transformArrayToMap = transformArrayToMap;
//# sourceMappingURL=transform.js.map