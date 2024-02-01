"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplePassHandler = void 0;
const applePassHandlerHelper_1 = require("./applePassHandlerHelper");
function createApplePassHandler(createApplePassUsecase, passService) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const createData = {
            expiredAt: req.body.expiredAt,
            barcodeMessage: (_a = req.body.barcodeMessage) !== null && _a !== void 0 ? _a : null,
            type: req.body.type,
            data: (0, applePassHandlerHelper_1.getDataByType)(req.body.type, req),
        };
        const id = (_b = req.body.id) !== null && _b !== void 0 ? _b : undefined;
        const applePass = yield createApplePassUsecase.execute(createData, id);
        res.json(Object.assign(Object.assign({}, applePass), { downloadUrl: passService.getDownloadUrl(applePass.id, applePass.token) }));
    });
}
exports.createApplePassHandler = createApplePassHandler;
//# sourceMappingURL=createApplePassHandler.js.map