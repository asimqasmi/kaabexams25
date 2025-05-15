import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
