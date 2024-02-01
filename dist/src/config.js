"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConfig = void 0;
function buildConfig() {
    var _a, _b, _c, _d, _e;
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    const isNewRelicEnabled = process.env.NEW_RELIC_ENABLED === "true" ||
        process.env.NEW_RELIC_ENABLED === "1";
    return {
        api: {
            port,
        },
        storages: {
            mongodb: {
                dsn: (_b = process.env.MONGODB_DSN) !== null && _b !== void 0 ? _b : "",
                database: (_c = process.env.MONGODB_DB) !== null && _c !== void 0 ? _c : "",
                connectionTimeoutMs: 3000,
                socketTimeoutMS: 3000,
            },
        },
        security: {
            tokenSecret: process.env.TOKEN_SECRET,
        },
        loggerOptions: {
            logLevel: (_d = process.env.LOG_LEVEL) !== null && _d !== void 0 ? _d : "error",
            sentryDsn: (_e = process.env.SENTRY_DSN) !== null && _e !== void 0 ? _e : "",
            isNewRelicEnabled,
        },
        applePass: {
            url: process.env.APPLE_PASS_URL,
            passTypeIdentifier: process.env.APPLE_PASS_TYPE_IDENTIFIER,
            teamIdentifier: process.env.APPLE_TEAM_IDENTIFIER,
            organizationName: process.env.APPLE_ORGANIZATION_NAME,
            signerCert: process.env.APPLE_SIGNER_CERT,
            signerKey: process.env.APPLE_SIGNER_KEY,
            authKey: process.env.APPLE_AUTH_KEY,
            signerKeyPassphrase: process.env.SIGNER_KEY_PASSPHARSE,
            apnTeamId: process.env.APPLE_APN_TEAM_ID,
            apnKeyId: process.env.APPLE_APN_KEY_ID,
        },
    };
}
exports.buildConfig = buildConfig;
//# sourceMappingURL=config.js.map