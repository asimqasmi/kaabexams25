import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "@/lib/env.mjs";

export const sqlite = createClient({
  url: env.DATABASE_URL!,
});

export const db = drizzle(sqlite);
