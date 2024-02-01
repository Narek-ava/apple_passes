"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewChangesFoundError = void 0;
const ApplicationError_1 = require("./ApplicationError");
class NewChangesFoundError extends ApplicationError_1.ApplicationError {
    constructor() {
        super("new_changes_found", "New changes found");
    }
}
exports.NewChangesFoundError = NewChangesFoundError;
//# sourceMappingURL=NewChangesFoundError.js.map