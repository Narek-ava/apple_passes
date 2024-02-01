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
exports.downloadApplePassHandler = void 0;
const PassNotChangedError_1 = require("../../../app/errors/apple/PassNotChangedError");
function downloadApplePassHandler(downloadApplePassUsecase) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const ifModifiedSince = req.headers["if-modified-since"];
        const ifModifiedSinceTime = ifModifiedSince
            ? Date.parse(ifModifiedSince)
            : 0;
        const downloadData = {
            passTypeIdentifier: req.params.passTypeIdentifier,
            id: req.params.id,
            token: (_c = (_a = req.query.token) !== null && _a !== void 0 ? _a : (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace("ApplePass ", "")) !== null && _c !== void 0 ? _c : "",
            ifModifiedSince: ifModifiedSinceTime,
        };
        try {
            const pkPass = yield downloadApplePassUsecase.execute(downloadData);
            const stream = pkPass.getAsStream();
            res.set({
                "Content-type": pkPass.mimeType,
                "Content-disposition": `attachment; filename=pass.pkpass`,
                "last-modified": Date.now(),
            });
            stream.pipe(res);
        }
        catch (error) {
            if (error instanceof PassNotChangedError_1.PassNotChangedError) {
                // Handle the custom error
                res.status(200).json({});
            }
            else {
                throw error;
            }
        }
    });
}
exports.downloadApplePassHandler = downloadApplePassHandler;
//# sourceMappingURL=downloadApplePassHandler.js.map