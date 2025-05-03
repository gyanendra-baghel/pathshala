import logger from "./utils/logger";
import config from "./config/config";
import app from "./app";
import prisma from "./config/database";

// Start the server
prisma
  .$connect()
  .then(() => {
    app.listen(config.app.port, () => {
      logger.info(`Server started on http://localhost:${config.app.port}`);
    });
  })
  .catch((error) => logger.error("Error connecting to the database", error));
