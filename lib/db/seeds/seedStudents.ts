import { db } from "..";
import * as studentsJson from "@/lib/db/data/students.json";
import { Student, students } from "../schema/students";

export const seedStudents = async () => {
  console.log("Seeding students......");
  await db.delete(students);

  const data = await Promise.all(
    studentsJson.map((s) => {
      return {
        // id: s.id,
        nameEn: s.name_en,
        nameAr: s.name_ar,
        section: s.section,
        grade: s.grade,
        studentNumber: s.student_number,
      } as Student;
    }),
  );

  await db.insert(students).values(data);
};
