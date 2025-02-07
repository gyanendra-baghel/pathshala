"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
// General application configuration
const config = {
    app: {
        port: process.env.PORT || 5000, // Port the app will run on
        jwtSecret: process.env.JWT_SECRET || "your-secret-key", // Secret key for JWT
    },
    db: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "your-database-user",
        password: process.env.DB_PASSWORD || "your-database-password",
        database: process.env.DB_DATABASE || "your-database-name",
    },
    logging: {
        level: process.env.LOG_LEVEL || "info", // Default log level
    },
};
exports.default = config;
