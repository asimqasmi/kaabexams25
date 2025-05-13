import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type StudentId, studentIdSchema, students } from "@/lib/db/schema/students";

export const getStudents = async () => {
  const rows = await db.select().from(students);
  const s = rows
  return { students: s };
};

export const getStudentById = async (id: StudentId) => {
  const { id: studentId } = studentIdSchema.parse({ id });
  const [row] = await db.select().from(students).where(eq(students.id, studentId));
  if (row === undefined) return {};
  const s = row;
  return { student: s };
};


