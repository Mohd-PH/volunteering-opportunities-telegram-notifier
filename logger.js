const winston = require("winston");
const path = require("path");
require("./env.js");

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} (${level.toUpperCase()}): ${JSON.stringify(message)}`;
  })
);
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "combined.log",
      dirname: path.join(__dirname, "logs"),
    }),
  ],
  level: "info",
  format,
});

const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "combined.log",
      dirname: path.join(__dirname, "logs"),
    }),
  ],
  level: "silly",
  format,
});

const testingLogger = winston.createLogger({
  transports: [new winston.transports.Console()],
  level: "error",
  format,
});

const actionsLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "actions.log",
      dirname: path.join(__dirname, "logs"),
    }),
  ],
  level: "info",
  format,
});

module.exports = {
  logger:
    process.env.ENV == "testing"
      ? testingLogger
      : process.env.ENV == "development"
      ? devLogger
      : logger,
  devLogger,
  testingLogger,
  actionsLogger: process.env.ENV == "testing" ? testingLogger : actionsLogger,
};
