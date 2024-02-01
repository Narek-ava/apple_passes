"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stdoutFormat = void 0;
const moment_1 = __importDefault(require("moment"));
function levelNum(level) {
    switch (level) {
        case "emerg":
            return 0;
        case "alert":
            return 1;
        case "crit":
            return 2;
        case "error":
            return 3;
        case "warn":
        case "warning":
            return 4;
        case "notice":
            return 5;
        case "info":
            return 6;
        case "debug":
            return 7;
        default:
            return -1;
    }
}
function stdoutFormat(info) {
    const context = Object.assign({}, info);
    delete context.level;
    delete context.message;
    return JSON.stringify({
        log_scheme: "1.0",
        timestamp: (0, moment_1.default)().format("YYYY-MM-DDTHH:mm:ssZZ"),
        message: info.message,
        level: info.level,
        level_num: levelNum(info.level),
        context: context,
    });
}
exports.stdoutFormat = stdoutFormat;
//# sourceMappingURL=stdoutFormat.js.map