import { TransformableInfo } from "logform";
import moment from "moment";

function levelNum(level: string): number {
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

export function stdoutFormat(info: TransformableInfo): string {
  const context: Partial<TransformableInfo> = { ...info };
  delete context.level;
  delete context.message;

  return JSON.stringify({
    log_scheme: "1.0",
    timestamp: moment().format("YYYY-MM-DDTHH:mm:ssZZ"),
    message: info.message,
    level: info.level,
    level_num: levelNum(info.level),
    context: context,
  });
}
