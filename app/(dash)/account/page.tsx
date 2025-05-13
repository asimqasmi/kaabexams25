import { auth } from "@/auth";
import UserSettings from "./UserSettings";

export default async function Account() {
  const session = await auth();
  if (!session) return <div>not authenticated</div>;
  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
