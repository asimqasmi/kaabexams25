import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  TeacherDismissalId,
  NewTeacherDismissalParams,
  UpdateTeacherDismissalParams,
  updateTeacherDismissalSchema,
  insertTeacherDismissalSchema,
  teacherDismissals,
  teacherDismissalIdSchema,
} from "@/lib/db/schema/teacherDismissals";
import { auth } from "@/auth";

export const createTeacherDismissal = async (
  teacherDismissal: NewTeacherDismissalParams,
) => {
  const session = await auth();
  const newTeacherDismissal = insertTeacherDismissalSchema.parse({
    ...teacherDismissal,
    userId: session?.user.id,
  });
  try {
    const [t] = await db
      .insert(teacherDismissals)
      .values(newTeacherDismissal)
      .returning();
    return { teacherDismissal: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTeacherDismissal = async (
  id: TeacherDismissalId,
  teacherDismissal: UpdateTeacherDismissalParams,
) => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User session is not available");
  }
  const userId = session.user.id;

  const { id: teacherDismissalId } = teacherDismissalIdSchema.parse({ id });
  const newTeacherDismissal = updateTeacherDismissalSchema.parse({
    ...teacherDismissal,
    userId: session?.user.id,
  });
  try {
    const [t] = await db
      .update(teacherDismissals)
      .set({
        ...newTeacherDismissal,
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .where(
        and(
          eq(teacherDismissals.id, teacherDismissalId!),
          eq(teacherDismissals.userId, userId),
        ),
      )
      .returning();
    return { teacherDismissal: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTeacherDismissal = async (id: TeacherDismissalId) => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User session is not available");
  }
  const userId = session.user.id;

  const { id: teacherDismissalId } = teacherDismissalIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(teacherDismissals)
      .where(
        and(
          eq(teacherDismissals.id, teacherDismissalId!),
          eq(teacherDismissals.userId, userId),
        ),
      )
      .returning();
    return { teacherDismissal: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
