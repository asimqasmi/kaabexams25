"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Student, CompleteStudent } from "@/lib/db/schema/students";
import Modal from "@/components/shared/Modal";

import { useOptimisticStudents } from "@/app/(app)/students/useOptimisticStudents";
import { Button } from "@/components/ui/button";
import StudentForm from "./StudentForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (student?: Student) => void;

export default function StudentList({
  students,
   
}: {
  students: CompleteStudent[];
   
}) {
  const { optimisticStudents, addOptimisticStudent } = useOptimisticStudents(
    students,
     
  );
  const [open, setOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const openModal = (student?: Student) => {
    setOpen(true);
    student ? setActiveStudent(student) : setActiveStudent(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeStudent ? "Edit Student" : "Create Student"}
      >
        <StudentForm
          student={activeStudent}
          addOptimistic={addOptimisticStudent}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticStudents.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticStudents.map((student) => (
            <Student
              student={student}
              key={student.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Student = ({
  student,
  openModal,
}: {
  student: CompleteStudent;
  openModal: TOpenModal;
}) => {
  const optimistic = student.id === "optimistic";
  const deleting = student.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("students")
    ? pathname
    : pathname + "/students/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{student.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + student.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No students
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new student.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Students </Button>
      </div>
    </div>
  );
};
