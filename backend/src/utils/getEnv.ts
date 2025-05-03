import { config } from "dotenv";
// Load environment variables from .env file
config();

export const getEnv = (key: string, defaultValue: string = "") => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};
