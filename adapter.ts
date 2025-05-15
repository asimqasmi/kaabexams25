import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./lib/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "./lib/db/schema/auth";
import { and, eq } from "drizzle-orm";
import { AdapterAccount } from "next-auth/adapters";

export const drizzleAdapter = {
  ...DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  getAccount: async (providerAccountId: string, provider: string) => {
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId),
        ),
      );
    return (account as AdapterAccount) ?? null;
  },
};
