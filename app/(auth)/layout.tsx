// import { getUserAuth } from "@/lib/auth/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getUserAuth();
  const session = await auth();
  if (session) redirect("/dashboard");

  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
