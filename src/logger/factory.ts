import { createLogger, format, Logger, transports } from "winston";
import Sentry from "winston-sentry-log";
import NewRelic from "newrelic-winston";
import { LEVEL } from "triple-beam";
import { stdoutFormat } from "./stdoutFormat";

function newRelicLog(info, callback) {
  setImmediate(() => this.emit("logged", info));

  if (info[LEVEL] === "error") {
    this.newrelic.noticeError(info.message, {
      voucherTitle: info.voucherTitle,
    });
  }

  callback();
}

export function createApplicationLogger(options: {
  logLevel: string;
  sentryDsn: string;
  isNewRelicEnabled: boolean;
}): Logger {
  const logger = createLogger({ level: options.logLevel });

  logger.add(
    new transports.Console({
      format: format.printf(stdoutFormat),
    })
  );

  if (options.sentryDsn) {
    logger.add(
      new Sentry({
        dsn: options.sentryDsn,
        level: "error",
      })
    );
  }

  if (options.isNewRelicEnabled) {
    logger.add(
      new NewRelic({
        level: "error",
        log: newRelicLog,
      })
    );
  }

  return logger;
}
