import { DefaultUser } from "@auth/core/types";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email?: string;
    role?: string;
  }
  interface JWT {
    email?: string;
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
    } & DefaultUser;
  }
}
