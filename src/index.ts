import "reflect-metadata";
import * as winston from "winston";

function log_init() {
    const log = winston.createLogger({
        defaultMeta: { service: "user-service" },
        format: winston.format.json(),
        level: "info",
        transports: [
          //
          // - Write to all logs with level `info` and below to `combined.log`
          // - Write all logs error (and below) to `error.log`.
          //
          new winston.transports.File({ filename: "error.log", level: "error" }),
          new winston.transports.File({ filename: "combined.log" }),
        ],
      });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== "production") {
        log.add(new winston.transports.Console(
            {
                format: winston.format.simple(),
            },
        ));
    }

    return log;

}

const logger = log_init();
logger.info("Good things");
