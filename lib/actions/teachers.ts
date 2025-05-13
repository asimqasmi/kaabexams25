"use server";

import { revalidatePath } from "next/cache";
import {
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "@/lib/api/teachers/mutations";
import {
  TeacherId,
  NewTeacherParams,
  UpdateTeacherParams,
  teacherIdSchema,
  insertTeacherParams,
  updateTeacherParams,
} from "@/lib/db/schema/teachers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTeachers = () => revalidatePath("/teachers");

export const createTeacherAction = async (input: NewTeacherParams) => {
  try {
    const payload = insertTeacherParams.parse(input);
    await createTeacher(payload);
    revalidateTeachers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTeacherAction = async (input: UpdateTeacherParams) => {
  try {
    const payload = updateTeacherParams.parse(input);
    await updateTeacher(payload.id, payload);
    revalidateTeachers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTeacherAction = async (input: TeacherId) => {
  try {
    const payload = teacherIdSchema.parse({ id: input });
    await deleteTeacher(payload.id);
    revalidateTeachers();
  } catch (e) {
    return handleErrors(e);
  }
};