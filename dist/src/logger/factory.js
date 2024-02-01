"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationLogger = void 0;
const winston_1 = require("winston");
const winston_sentry_log_1 = __importDefault(require("winston-sentry-log"));
const newrelic_winston_1 = __importDefault(require("newrelic-winston"));
const triple_beam_1 = require("triple-beam");
const stdoutFormat_1 = require("./stdoutFormat");
function newRelicLog(info, callback) {
    setImmediate(() => this.emit("logged", info));
    if (info[triple_beam_1.LEVEL] === "error") {
        this.newrelic.noticeError(info.message, {
            voucherTitle: info.voucherTitle,
        });
    }
    callback();
}
function createApplicationLogger(options) {
    const logger = (0, winston_1.createLogger)({ level: options.logLevel });
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.printf(stdoutFormat_1.stdoutFormat),
    }));
    if (options.sentryDsn) {
        logger.add(new winston_sentry_log_1.default({
            dsn: options.sentryDsn,
            level: "error",
        }));
    }
    if (options.isNewRelicEnabled) {
        logger.add(new newrelic_winston_1.default({
            level: "error",
            log: newRelicLog,
        }));
    }
    return logger;
}
exports.createApplicationLogger = createApplicationLogger;
//# sourceMappingURL=factory.js.map