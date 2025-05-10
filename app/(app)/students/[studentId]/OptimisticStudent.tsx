"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/students/useOptimisticStudents";
import { type Student } from "@/lib/db/schema/students";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import StudentForm from "@/components/students/StudentForm";


export default function OptimisticStudent({ 
  student,
   
}: { 
  student: Student; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Student) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticStudent, setOptimisticStudent] = useOptimistic(student);
  const updateStudent: TAddOptimistic = (input) =>
    setOptimisticStudent({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <StudentForm
          student={optimisticStudent}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateStudent}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticStudent.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticStudent.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticStudent, null, 2)}
      </pre>
    </div>
  );
}
