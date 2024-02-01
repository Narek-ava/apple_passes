import cluster from "cluster";
import os from "os";
import { create } from "./api/factory";
import { buildConfig } from "./config";

if (cluster.isPrimary && process.env.NODE_ENV === "production") {
  os.cpus().forEach(() => cluster.fork());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return;
}

async function init() {
  const config = buildConfig();
  const { app, logger } = create(config);

  app.listen(config.api.port, () =>
    logger.info({
      message: `Server is listening on: ${config.api.port}`,
      port: config.api.port,
    })
  );
}

init().catch((err) => {
  console.error(
    `Application initialization failed: "${err?.message || "Internal error"}`
  );
  process.exit(1);
});
