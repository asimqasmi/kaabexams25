import { db } from "..";
import * as teachersJson from "@/lib/db/data/teachers.json";
import { Teacher, teachers } from "../schema/teachers";

export const seedTeachers = async () => {
  console.log("Seeding teachers......");
  await db.delete(teachers);

  const data = await Promise.all(
    teachersJson.map((s) => {
      return {
        id: s.id.toString(),
        name: s.name,
        email: s.email,
        role: s.role,
        availableForInvig: s.available_for_invig === 0 ? false : true,
        fileNumber: s.file_number,
        phone: s.phone,
        jobTitle: s.job_title,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      } as Teacher;
    }),
  );

  await db.insert(teachers).values(data);
};
