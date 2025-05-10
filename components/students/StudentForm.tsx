import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/students/useOptimisticStudents";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";




import { type Student, insertStudentParams } from "@/lib/db/schema/students";
import {
  createStudentAction,
  deleteStudentAction,
  updateStudentAction,
} from "@/lib/actions/students";


const StudentForm = ({
  
  student,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  student?: Student | null;
  
  openModal?: (student?: Student) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Student>(insertStudentParams);
  const editing = !!student?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("students");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Student },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Student ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const studentParsed = await insertStudentParams.safeParseAsync({  ...payload });
    if (!studentParsed.success) {
      setErrors(studentParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = studentParsed.data;
    const pendingStudent: Student = {
      updatedAt: student?.updatedAt ?? new Date(),
      createdAt: student?.createdAt ?? new Date(),
      id: student?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingStudent,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateStudentAction({ ...values, id: student.id })
          : await createStudentAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingStudent 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={student?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.nameEn ? "text-destructive" : "",
          )}
        >
          Name En
        </Label>
        <Input
          type="text"
          name="nameEn"
          className={cn(errors?.nameEn ? "ring ring-destructive" : "")}
          defaultValue={student?.nameEn ?? ""}
        />
        {errors?.nameEn ? (
          <p className="text-xs text-destructive mt-2">{errors.nameEn[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.studentNumber ? "text-destructive" : "",
          )}
        >
          Student Number
        </Label>
        <Input
          type="text"
          name="studentNumber"
          className={cn(errors?.studentNumber ? "ring ring-destructive" : "")}
          defaultValue={student?.studentNumber ?? ""}
        />
        {errors?.studentNumber ? (
          <p className="text-xs text-destructive mt-2">{errors.studentNumber[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.grade ? "text-destructive" : "",
          )}
        >
          Grade
        </Label>
        <Input
          type="text"
          name="grade"
          className={cn(errors?.grade ? "ring ring-destructive" : "")}
          defaultValue={student?.grade ?? ""}
        />
        {errors?.grade ? (
          <p className="text-xs text-destructive mt-2">{errors.grade[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.section ? "text-destructive" : "",
          )}
        >
          Section
        </Label>
        <Input
          type="text"
          name="section"
          className={cn(errors?.section ? "ring ring-destructive" : "")}
          defaultValue={student?.section ?? ""}
        />
        {errors?.section ? (
          <p className="text-xs text-destructive mt-2">{errors.section[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: student });
              const error = await deleteStudentAction(student.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: student,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default StudentForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
