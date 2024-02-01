"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataByType = exports.getBoardingPassData = void 0;
const UnhandledDataTypeError_1 = require("../../../app/errors/apple/UnhandledDataTypeError");
function getBoardingPassData(req) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
    return {
        from: {
            label: (_d = (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.from) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "",
            value: (_h = (_g = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.from) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : "",
        },
        to: {
            label: (_m = (_l = (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.to) === null || _l === void 0 ? void 0 : _l.label) !== null && _m !== void 0 ? _m : "",
            value: (_r = (_q = (_p = (_o = req.body) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.to) === null || _q === void 0 ? void 0 : _q.value) !== null && _r !== void 0 ? _r : "",
        },
        passenger: {
            label: (_v = (_u = (_t = (_s = req.body) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.passenger) === null || _u === void 0 ? void 0 : _u.label) !== null && _v !== void 0 ? _v : "",
            value: (_z = (_y = (_x = (_w = req.body) === null || _w === void 0 ? void 0 : _w.data) === null || _x === void 0 ? void 0 : _x.passenger) === null || _y === void 0 ? void 0 : _y.value) !== null && _z !== void 0 ? _z : "",
        },
        time: {
            label: (_3 = (_2 = (_1 = (_0 = req.body) === null || _0 === void 0 ? void 0 : _0.data) === null || _1 === void 0 ? void 0 : _1.time) === null || _2 === void 0 ? void 0 : _2.label) !== null && _3 !== void 0 ? _3 : "",
            value: (_7 = (_6 = (_5 = (_4 = req.body) === null || _4 === void 0 ? void 0 : _4.data) === null || _5 === void 0 ? void 0 : _5.time) === null || _6 === void 0 ? void 0 : _6.value) !== null && _7 !== void 0 ? _7 : "",
        },
        passengers: {
            label: (_11 = (_10 = (_9 = (_8 = req.body) === null || _8 === void 0 ? void 0 : _8.data) === null || _9 === void 0 ? void 0 : _9.passengers) === null || _10 === void 0 ? void 0 : _10.label) !== null && _11 !== void 0 ? _11 : "",
            value: (_15 = (_14 = (_13 = (_12 = req.body) === null || _12 === void 0 ? void 0 : _12.data) === null || _13 === void 0 ? void 0 : _13.passengers) === null || _14 === void 0 ? void 0 : _14.value) !== null && _15 !== void 0 ? _15 : "",
        },
        payToDriver: {
            label: (_19 = (_18 = (_17 = (_16 = req.body) === null || _16 === void 0 ? void 0 : _16.data) === null || _17 === void 0 ? void 0 : _17.payToDriver) === null || _18 === void 0 ? void 0 : _18.label) !== null && _19 !== void 0 ? _19 : "",
            value: (_23 = (_22 = (_21 = (_20 = req.body) === null || _20 === void 0 ? void 0 : _20.data) === null || _21 === void 0 ? void 0 : _21.payToDriver) === null || _22 === void 0 ? void 0 : _22.value) !== null && _23 !== void 0 ? _23 : "",
        },
    };
}
exports.getBoardingPassData = getBoardingPassData;
function getDataByType(type, req) {
    switch (type) {
        case "boardingPass":
            return getBoardingPassData(req);
        default:
            throw new UnhandledDataTypeError_1.UnhandledDataTypeError(`Unhandled data type: ${type}`);
    }
}
exports.getDataByType = getDataByType;
//# sourceMappingURL=applePassHandlerHelper.js.map