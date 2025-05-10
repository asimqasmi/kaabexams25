
import { type Student, type CompleteStudent } from "@/lib/db/schema/students";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Student>) => void;

export const useOptimisticStudents = (
  students: CompleteStudent[],
  
) => {
  const [optimisticStudents, addOptimisticStudent] = useOptimistic(
    students,
    (
      currentState: CompleteStudent[],
      action: OptimisticAction<Student>,
    ): CompleteStudent[] => {
      const { data } = action;

      

      const optimisticStudent = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticStudent]
            : [...currentState, optimisticStudent];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticStudent } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticStudent, optimisticStudents };
};
