import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type TeacherId, teacherIdSchema, teachers } from "@/lib/db/schema/teachers";
import { teacherDismissals, type CompleteTeacherDismissal } from "@/lib/db/schema/teacherDismissals";

export const getTeachers = async () => {
  const rows = await db.select().from(teachers);
  const t = rows
  return { teachers: t };
};

export const getTeacherById = async (id: TeacherId) => {
  const { id: teacherId } = teacherIdSchema.parse({ id });
  const [row] = await db.select().from(teachers).where(eq(teachers.id, teacherId));
  if (row === undefined) return {};
  const t = row;
  return { teacher: t };
};

export const getTeacherByIdWithTeacherDismissals = async (id: TeacherId) => {
  const { id: teacherId } = teacherIdSchema.parse({ id });
  const rows = await db.select({ teacher: teachers, teacherDismissal: teacherDismissals }).from(teachers).where(eq(teachers.id, teacherId)).leftJoin(teacherDismissals, eq(teachers.id, teacherDismissals.teacherId));
  if (rows.length === 0) return {};
  const t = rows[0].teacher;
  const tt = rows.filter((r) => r.teacherDismissal !== null).map((t) => t.teacherDismissal) as CompleteTeacherDismissal[];

  return { teacher: t, teacherDismissals: tt };
};

