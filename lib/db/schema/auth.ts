import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getUsers } from "@/lib/api/users/queries";
import { teachers } from "./teachers";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  role: text("role").default("user"),
  teacherId: integer("teacher_id").references(() => teachers.id, {
    onDelete: "cascade",
  }),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

// Schema for users - used to validate API requests
const baseSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users);
export const insertUserParams = baseSchema
  .extend({
    fileNumber: z.coerce.number(),
    availableForInvig: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateUserSchema = baseSchema;
export const updateUserParams = baseSchema.extend({
  fileNumber: z.coerce.number(),
  availableForInvig: z.coerce.boolean(),
});
export const userIdSchema = baseSchema.pick({ id: true });

// Types for users - used to type API request params and within Components
export type User = typeof users.$inferSelect;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type userId = z.infer<typeof userIdSchema>["id"];

// this type infers the return from getusers() - meaning it will include any joins
export type CompleteUser = Awaited<
  ReturnType<typeof getUsers>
>["users"][number];
