import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import {
  type TeacherDismissalId,
  teacherDismissalIdSchema,
  teacherDismissals,
} from "@/lib/db/schema/teacherDismissals";
import { teachers } from "@/lib/db/schema/teachers";
import { auth } from "@/auth";

export const getTeacherDismissals = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User session is not available");
  }
  const userId = session.user.id;

  const rows = await db
    .select({ teacherDismissal: teacherDismissals, teacher: teachers })
    .from(teacherDismissals)
    .leftJoin(teachers, eq(teacherDismissals.teacherId, teachers.id))
    .where(eq(teacherDismissals.userId, userId));
  const t = rows.map((r) => ({ ...r.teacherDismissal, teacher: r.teacher }));
  return { teacherDismissals: t };
};

export const getTeacherDismissalById = async (id: TeacherDismissalId) => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User session is not available");
  }
  const userId = session.user.id;

  const { id: teacherDismissalId } = teacherDismissalIdSchema.parse({ id });
  const [row] = await db
    .select({ teacherDismissal: teacherDismissals, teacher: teachers })
    .from(teacherDismissals)
    .where(
      and(
        eq(teacherDismissals.id, teacherDismissalId),
        eq(teacherDismissals.userId, userId),
      ),
    )
    .leftJoin(teachers, eq(teacherDismissals.teacherId, teachers.id));
  if (row === undefined) return {};
  const t = { ...row.teacherDismissal, teacher: row.teacher };
  return { teacherDismissal: t };
};
