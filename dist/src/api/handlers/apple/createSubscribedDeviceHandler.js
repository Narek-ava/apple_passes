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
exports.createSubscribedDeviceHandler = void 0;
function createSubscribedDeviceHandler(createSubscribedDeviceUsecase) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const registerDevice = {
            passId: req.params.passId,
            pushToken: req.body.pushToken,
            deviceLibraryIdentifier: req.params.deviceLibraryIdentifier,
        };
        const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("ApplePass ", "")) !== null && _b !== void 0 ? _b : "";
        yield createSubscribedDeviceUsecase.execute(registerDevice, token);
        res.status(201);
    });
}
exports.createSubscribedDeviceHandler = createSubscribedDeviceHandler;
//# sourceMappingURL=createSubscribedDeviceHandler.js.map