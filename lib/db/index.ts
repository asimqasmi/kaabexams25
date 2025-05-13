import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "@/lib/env.mjs";

export const sqlite = createClient({
  url: env.DATABASE_URL,
  // url: env.TURSO_DATABASE_URL!,
  // authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(sqlite);
