"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  return <button onClick={() => signIn("google", {})}>Sign In</button>;
}
