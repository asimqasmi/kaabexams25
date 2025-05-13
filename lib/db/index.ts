import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "@/lib/env.mjs";

const config =
  env.NODE_ENV === "development"
    ? {
      url: env.DATABASE_URL,
    }
    : {
      url: env.TURSO_DATABASE_URL!,
      authToken: env.TURSO_AUTH_TOKEN,
    };
export const sqlite = createClient(config);

export const db = drizzle(sqlite);
