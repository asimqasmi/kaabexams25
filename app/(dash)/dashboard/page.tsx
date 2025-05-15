import { auth } from "@/auth";
import { SignIn } from "@/components/auth/SignInBtn";
import { env } from "@/lib/env.mjs";
// import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  // const { session } = await getUserAuth();
  const session = await auth();
  return (
    <main className="space-y-4">
      {JSON.stringify(env.DATABASE_URL, null, 2)}
      hi
      {session ? (
        <pre className="bg-secondary p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
