import { getTeachers } from "@/lib/api/teachers/queries";

const TeacherPage = async () => {
  const teachers = await getTeachers();
  return (
    <div>
      TeacherPage
      <pre>{JSON.stringify(teachers, null, 2)}</pre>
    </div>
  );
};

export default TeacherPage;
