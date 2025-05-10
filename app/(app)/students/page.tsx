import { Suspense } from "react";

import Loading from "@/app/loading";
import StudentList from "@/components/students/StudentList";
import { getStudents } from "@/lib/api/students/queries";


export const revalidate = 0;

export default async function StudentsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Students</h1>
        </div>
        <Students />
      </div>
    </main>
  );
}

const Students = async () => {
  
  const { students } = await getStudents();
  
  return (
    <Suspense fallback={<Loading />}>
      <StudentList students={students}  />
    </Suspense>
  );
};
