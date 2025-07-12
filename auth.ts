import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [Google],
  pages: {
    signIn: "/sign-in",
  },
});
