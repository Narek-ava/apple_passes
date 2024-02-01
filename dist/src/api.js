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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const factory_1 = require("./api/factory");
const config_1 = require("./config");
if (cluster_1.default.isPrimary && process.env.NODE_ENV === "production") {
    os_1.default.cpus().forEach(() => cluster_1.default.fork());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = (0, config_1.buildConfig)();
        const { app, logger } = (0, factory_1.create)(config);
        app.listen(config.api.port, () => logger.info({
            message: `Server is listening on: ${config.api.port}`,
            port: config.api.port,
        }));
    });
}
init().catch((err) => {
    console.error(`Application initialization failed: "${(err === null || err === void 0 ? void 0 : err.message) || "Internal error"}`);
    process.exit(1);
});
//# sourceMappingURL=api.js.map