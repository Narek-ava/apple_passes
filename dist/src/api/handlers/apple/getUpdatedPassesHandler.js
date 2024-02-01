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
exports.getUpdatedPassesHandler = void 0;
function getUpdatedPassesHandler(getUpdatedPassesUsecase) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        const deviceLibraryIdentifier = req.params.deviceLibraryIdentifier;
        const passesUpdatedSince = req.query.passesUpdatedSince;
        const lastUpdatedAt = passesUpdatedSince
            ? Date.parse(passesUpdatedSince)
            : 0;
        const updatedPasses = yield getUpdatedPassesUsecase.execute(deviceLibraryIdentifier, lastUpdatedAt);
        if (updatedPasses.length > 0) {
            res.status(200).json({
                serialNumbers: updatedPasses,
                lastUpdated: new Date(),
            });
        }
        else {
            res.status(204).json();
        }
    });
}
exports.getUpdatedPassesHandler = getUpdatedPassesHandler;
//# sourceMappingURL=getUpdatedPassesHandler.js.map