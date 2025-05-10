import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getStudentById } from "@/lib/api/students/queries";
import OptimisticStudent from "./OptimisticStudent";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function StudentPage({
  params,
}: {
  params: { studentId: string };
}) {

  return (
    <main className="overflow-auto">
      <Student id={params.studentId} />
    </main>
  );
}

const Student = async ({ id }: { id: string }) => {
  
  const { student } = await getStudentById(id);
  

  if (!student) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="students" />
        <OptimisticStudent student={student}  />
      </div>
    </Suspense>
  );
};
