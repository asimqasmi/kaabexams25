import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getTeachers } from "@/lib/api/teachers/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const teachers = sqliteTable('teachers', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  fileNumber: integer("file_number").notNull(),
  jobTitle: text("job_title").notNull(),
  phone: text("phone"),
  email: text("email"),
  role: text("role"),
  availableForInvig: integer("available_for_invig", { mode: "boolean" }).notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

}, (teachers) => {
  return {
    fileNumberIndex: uniqueIndex('teacher_file_number_idx').on(teachers.fileNumber),
  }
});


// Schema for teachers - used to validate API requests
const baseSchema = createSelectSchema(teachers).omit(timestamps)

export const insertTeacherSchema = createInsertSchema(teachers).omit(timestamps);
export const insertTeacherParams = baseSchema.extend({
  fileNumber: z.coerce.number(),
  availableForInvig: z.coerce.boolean()
}).omit({ 
  id: true
});

export const updateTeacherSchema = baseSchema;
export const updateTeacherParams = baseSchema.extend({
  fileNumber: z.coerce.number(),
  availableForInvig: z.coerce.boolean()
})
export const teacherIdSchema = baseSchema.pick({ id: true });

// Types for teachers - used to type API request params and within Components
export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = z.infer<typeof insertTeacherSchema>;
export type NewTeacherParams = z.infer<typeof insertTeacherParams>;
export type UpdateTeacherParams = z.infer<typeof updateTeacherParams>;
export type TeacherId = z.infer<typeof teacherIdSchema>["id"];
    
// this type infers the return from getTeachers() - meaning it will include any joins
export type CompleteTeacher = Awaited<ReturnType<typeof getTeachers>>["teachers"][number];

