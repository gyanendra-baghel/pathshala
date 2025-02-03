import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

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

export default config;
