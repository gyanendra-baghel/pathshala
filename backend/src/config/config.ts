import { getEnv } from "../utils/getEnv";

const config = {
  app: {
    port: getEnv("PORT"), // Port the app will run on
    jwtSecret: getEnv("JWT_SECRET", "your-secret-key"), // Secret key for JWT
    clientUrl: getEnv("CLIENT_URL"), // CORS origin
  },
  dbUrl: getEnv("DATABASE_URL"), // MongoDB connection string
  logging: {
    level: getEnv("LOG_LEVEL", "info"), // Default log level
  },
  cloudinary: {
    cloudName: getEnv("CLOUDINARY_CLOUD_NAME", "dvyt2zexg"),
    apiKey: getEnv("CLOUDINARY_API_KEY", "481397721463527"),
    apiSecret: getEnv("CLOUDINARY_API_SECRET", "A-LPFsgvs4sDxEbitCCWheeH1Ck"),
  },
};

export default config;
