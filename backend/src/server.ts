import dotenv from "dotenv";
import logger from "./utils/logger";
import config from "./config/config";
import app from "./app";

// Initialize environment variables
dotenv.config();

// Initialize Prisma Client
// const prisma = new PrismaClient();

// Start the server
app.listen(config.app.port, () => {
  logger.info(`Server started on http://localhost:${config.app.port}`);
  // Optionally, connect to Prisma Client
  // prisma
  //   .$connect()
  //   .then(() => logger.info("Connected to the database"))
  //   .catch((error) => logger.error("Error connecting to the database", error));
});
