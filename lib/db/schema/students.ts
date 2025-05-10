import { sql } from "drizzle-orm";
import { varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getStudents } from "@/lib/api/students/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const students = pgTable('students', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  nameEn: varchar("name_en", { length: 256 }).notNull(),
  studentNumber: varchar("student_number", { length: 256 }).notNull(),
  grade: integer("grade").notNull(),
  section: integer("section").notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for students - used to validate API requests
const baseSchema = createSelectSchema(students).omit(timestamps)

export const insertStudentSchema = createInsertSchema(students).omit(timestamps);
export const insertStudentParams = baseSchema.extend({
  grade: z.coerce.number(),
  section: z.coerce.number()
}).omit({ 
  id: true
});

export const updateStudentSchema = baseSchema;
export const updateStudentParams = baseSchema.extend({
  grade: z.coerce.number(),
  section: z.coerce.number()
})
export const studentIdSchema = baseSchema.pick({ id: true });

// Types for students - used to type API request params and within Components
export type Student = typeof students.$inferSelect;
export type NewStudent = z.infer<typeof insertStudentSchema>;
export type NewStudentParams = z.infer<typeof insertStudentParams>;
export type UpdateStudentParams = z.infer<typeof updateStudentParams>;
export type StudentId = z.infer<typeof studentIdSchema>["id"];
    
// this type infers the return from getStudents() - meaning it will include any joins
export type CompleteStudent = Awaited<ReturnType<typeof getStudents>>["students"][number];

