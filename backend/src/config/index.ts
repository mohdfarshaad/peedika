import dotenv from "dotenv";
import ms, { StringValue } from "ms";

dotenv.config();

interface EnvConfig {
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: ms.StringValue | number | undefined;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRY: ms.StringValue | number | undefined;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const getConfig = (): EnvConfig => {
  const config: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    CORS_ORIGIN: process.env.CORS_ORIGIN || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as StringValue,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as StringValue,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  };

  const requiredEnvVars: (keyof EnvConfig)[] = [
    "DATABASE_URL",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  for (const envVar of requiredEnvVars) {
    if (!config[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return config;
};

export const config = getConfig();
