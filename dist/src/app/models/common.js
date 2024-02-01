"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGetCurrentTime = exports.generateToken = exports.defaultGenerateUniqueId = void 0;
const uuid4_1 = __importDefault(require("uuid4"));
const moment_1 = __importDefault(require("moment/moment"));
const crypto_1 = __importDefault(require("crypto"));
const defaultGenerateUniqueId = () => (0, uuid4_1.default)();
exports.defaultGenerateUniqueId = defaultGenerateUniqueId;
const generateToken = () => crypto_1.default.randomBytes(20).toString("hex");
exports.generateToken = generateToken;
const defaultGetCurrentTime = () => moment_1.default.utc();
exports.defaultGetCurrentTime = defaultGetCurrentTime;
//# sourceMappingURL=common.js.map