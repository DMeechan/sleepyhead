import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";
export const isProduction = environment === "production";
export const isDevelopment = environment === "development";

if (!isProduction && !isDevelopment) {
  throw new Error("my NODE_ENV seems unfamiliar");
}

export const databaseUrl =
  process.env.DATABASE_URL || `postgres://postgres@postgres/sleepyhead`;
