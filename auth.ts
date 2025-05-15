import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./lib/env.mjs";
import { drizzleAdapter } from "./adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: drizzleAdapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // async session({ session, user }) {
    //   session.user.id = user.id;
    //   return session;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
