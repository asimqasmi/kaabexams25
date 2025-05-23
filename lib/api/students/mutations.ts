import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import {
  StudentId,
  NewStudentParams,
  UpdateStudentParams,
  updateStudentSchema,
  insertStudentSchema,
  students,
  studentIdSchema,
} from "@/lib/db/schema/students";

export const createStudent = async (student: NewStudentParams) => {
  const newStudent = insertStudentSchema.parse(student);
  try {
    const [s] = await db.insert(students).values(newStudent).returning();
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateStudent = async (
  id: StudentId,
  student: UpdateStudentParams,
) => {
  const { id: studentId } = studentIdSchema.parse({ id });
  const newStudent = updateStudentSchema.parse(student);
  try {
    const [s] = await db
      .update(students)
      .set({
        ...newStudent,
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .where(eq(students.id, studentId!))
      .returning();
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteStudent = async (id: StudentId) => {
  const { id: studentId } = studentIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(students)
      .where(eq(students.id, studentId!))
      .returning();
    return { student: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
