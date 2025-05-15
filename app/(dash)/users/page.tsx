import { getUsers } from "@/lib/api/users/queries";

const userPage = async () => {
  const users = await getUsers();
  return (
    <div>
      userPage
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default userPage;
