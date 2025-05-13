import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

const dbCredentials =
  env.NODE_ENV === "development"
    ? {
      url: env.DATABASE_URL,
    }
    : {
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    };

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema",
  dialect: env.NODE_ENV === "development" ? "sqlite" : "turso",
  // dialect: "turso",
  // dialect: "sqlite",
  dbCredentials,
});
