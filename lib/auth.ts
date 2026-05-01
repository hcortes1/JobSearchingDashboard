import type { NextAuthOptions } from "next-auth";
// TODO: Phase 2 — add CredentialsProvider with Bcrypt password check + Prisma user lookup

export const authOptions: NextAuthOptions = {
  providers: [],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
};
