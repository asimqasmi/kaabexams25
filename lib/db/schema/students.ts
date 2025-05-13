import { sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getStudents } from "@/lib/api/students/queries";

import { timestamps } from "@/lib/utils";

export const students = sqliteTable(
  "students",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    nameAr: text("name_ar").notNull(),
    nameEn: text("name_en").notNull(),
    studentNumber: integer("student_number").notNull(),
    grade: integer("grade").notNull(),
    section: integer("section").notNull(),

    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (students) => {
    return {
      studentNumberIndex: uniqueIndex("student_student_number_idx").on(
        students.studentNumber,
      ),
    };
  },
);

// Schema for students - used to validate API requests
const baseSchema = createSelectSchema(students).omit(timestamps);

export const insertStudentSchema =
  createInsertSchema(students).omit(timestamps);
export const insertStudentParams = baseSchema
  .extend({
    studentNumber: z.coerce.number(),
    grade: z.coerce.number(),
    section: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateStudentSchema = baseSchema;
export const updateStudentParams = baseSchema.extend({
  studentNumber: z.coerce.number(),
  grade: z.coerce.number(),
  section: z.coerce.number(),
});
export const studentIdSchema = baseSchema.pick({ id: true });

// Types for students - used to type API request params and within Components
export type Student = typeof students.$inferSelect;
export type NewStudent = z.infer<typeof insertStudentSchema>;
export type NewStudentParams = z.infer<typeof insertStudentParams>;
export type UpdateStudentParams = z.infer<typeof updateStudentParams>;
export type StudentId = z.infer<typeof studentIdSchema>["id"];

// this type infers the return from getStudents() - meaning it will include any joins
export type CompleteStudent = Awaited<
  ReturnType<typeof getStudents>
>["students"][number];
