"use server";

import { revalidatePath } from "next/cache";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "@/lib/api/students/mutations";
import {
  StudentId,
  NewStudentParams,
  UpdateStudentParams,
  studentIdSchema,
  insertStudentParams,
  updateStudentParams,
} from "@/lib/db/schema/students";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStudents = () => revalidatePath("/students");

export const createStudentAction = async (input: NewStudentParams) => {
  try {
    const payload = insertStudentParams.parse(input);
    await createStudent(payload);
    revalidateStudents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStudentAction = async (input: UpdateStudentParams) => {
  try {
    const payload = updateStudentParams.parse(input);
    await updateStudent(payload.id, payload);
    revalidateStudents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStudentAction = async (input: StudentId) => {
  try {
    const payload = studentIdSchema.parse({ id: input });
    await deleteStudent(payload.id);
    revalidateStudents();
  } catch (e) {
    return handleErrors(e);
  }
};