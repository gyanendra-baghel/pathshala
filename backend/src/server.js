"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./config/config"));
const app_1 = __importDefault(require("./app"));
// Initialize environment variables
dotenv_1.default.config();
// Initialize Prisma Client
// const prisma = new PrismaClient();
// Start the server
app_1.default.listen(config_1.default.app.port, () => {
    logger_1.default.info(`Server started on http://localhost:${config_1.default.app.port}`);
    // Optionally, connect to Prisma Client
    // prisma
    //   .$connect()
    //   .then(() => logger.info("Connected to the database"))
    //   .catch((error) => logger.error("Error connecting to the database", error));
});
