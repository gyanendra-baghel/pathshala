import winston from "winston";

// Create a custom logger
const logger = winston.createLogger({
  level: "info", // default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Log to console
    new winston.transports.File({ filename: "logs/combined.log" }), // Log to file
  ],
});

export default logger;
