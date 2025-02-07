"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
// Create a custom logger
const logger = winston_1.default.createLogger({
    level: "info", // default log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }), // Log to console
        new winston_1.default.transports.File({ filename: "logs/combined.log" }), // Log to file
    ],
});
exports.default = logger;
