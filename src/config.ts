export function buildConfig() {
  const port = process.env.PORT ?? 3000;

  const isNewRelicEnabled =
    process.env.NEW_RELIC_ENABLED === "true" ||
    process.env.NEW_RELIC_ENABLED === "1";

  return {
    api: {
      port,
    },
    storages: {
      mongodb: {
        dsn: process.env.MONGODB_DSN ?? "",
        database: process.env.MONGODB_DB ?? "",
        connectionTimeoutMs: 3000,
        socketTimeoutMS: 3000,
      },
    },
    security: {
      tokenSecret: process.env.TOKEN_SECRET,
    },
    loggerOptions: {
      logLevel: process.env.LOG_LEVEL ?? "error",
      sentryDsn: process.env.SENTRY_DSN ?? "",
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
