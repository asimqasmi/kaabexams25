import { db } from "@/lib/db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import { env } from "@/lib/env.mjs";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { AuthConfig } from "@auth/core";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const authOptions: AuthConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

// export const getUserAuth = async () => {
//   const session = await SessionProvider(AuthConfig);
//   return { session } as AuthSession;
// };
//
// export const checkAuth = async () => {
//   const { session } = await getUserAuth();
//   if (!session) redirect("/api/auth/signin");
// };
