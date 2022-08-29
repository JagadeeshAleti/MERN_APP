const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: new transports.File({
    filename: "./server.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

module.exports = logger;
