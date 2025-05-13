import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { teachers } from "./teachers"
import { users } from "@/lib/db/schema/auth";
import { type getTeacherDismissals } from "@/lib/api/teacherDismissals/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const teacherDismissals = sqliteTable('teacher_dismissals', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  reason: text("reason").notNull(),
  dismissedFromDate: integer("dismissed_from_date", { mode: "timestamp" }).notNull(),
  dismissedUntilDate: integer("dismissed_until_date", { mode: "timestamp" }).notNull(),
  status: text("status").notNull(),
  teacherId: text("teacher_id").references(() => teachers.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for teacherDismissals - used to validate API requests
const baseSchema = createSelectSchema(teacherDismissals).omit(timestamps)

export const insertTeacherDismissalSchema = createInsertSchema(teacherDismissals).omit(timestamps);
export const insertTeacherDismissalParams = baseSchema.extend({
  dismissedFromDate: z.coerce.date(),
  dismissedUntilDate: z.coerce.date(),
  teacherId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateTeacherDismissalSchema = baseSchema;
export const updateTeacherDismissalParams = baseSchema.extend({
  dismissedFromDate: z.coerce.date(),
  dismissedUntilDate: z.coerce.date(),
  teacherId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const teacherDismissalIdSchema = baseSchema.pick({ id: true });

// Types for teacherDismissals - used to type API request params and within Components
export type TeacherDismissal = typeof teacherDismissals.$inferSelect;
export type NewTeacherDismissal = z.infer<typeof insertTeacherDismissalSchema>;
export type NewTeacherDismissalParams = z.infer<typeof insertTeacherDismissalParams>;
export type UpdateTeacherDismissalParams = z.infer<typeof updateTeacherDismissalParams>;
export type TeacherDismissalId = z.infer<typeof teacherDismissalIdSchema>["id"];
    
// this type infers the return from getTeacherDismissals() - meaning it will include any joins
export type CompleteTeacherDismissal = Awaited<ReturnType<typeof getTeacherDismissals>>["teacherDismissals"][number];

