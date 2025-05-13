"use server";

import { revalidatePath } from "next/cache";
import {
  createTeacherDismissal,
  deleteTeacherDismissal,
  updateTeacherDismissal,
} from "@/lib/api/teacherDismissals/mutations";
import {
  TeacherDismissalId,
  NewTeacherDismissalParams,
  UpdateTeacherDismissalParams,
  teacherDismissalIdSchema,
  insertTeacherDismissalParams,
  updateTeacherDismissalParams,
} from "@/lib/db/schema/teacherDismissals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTeacherDismissals = () => revalidatePath("/teacher-dismissals");

export const createTeacherDismissalAction = async (input: NewTeacherDismissalParams) => {
  try {
    const payload = insertTeacherDismissalParams.parse(input);
    await createTeacherDismissal(payload);
    revalidateTeacherDismissals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTeacherDismissalAction = async (input: UpdateTeacherDismissalParams) => {
  try {
    const payload = updateTeacherDismissalParams.parse(input);
    await updateTeacherDismissal(payload.id, payload);
    revalidateTeacherDismissals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTeacherDismissalAction = async (input: TeacherDismissalId) => {
  try {
    const payload = teacherDismissalIdSchema.parse({ id: input });
    await deleteTeacherDismissal(payload.id);
    revalidateTeacherDismissals();
  } catch (e) {
    return handleErrors(e);
  }
};