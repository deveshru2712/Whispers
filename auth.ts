import NextAuth from "next-auth";
import { createSupaBaseClient } from "./lib/supabase";
import Google from "next-auth/providers/google";

const supabase = createSupaBaseClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("email")
          .eq("email", user.email!)
          .single();

        if (error || !data) {
          console.error("Unauthorized access attempt:", user.email);
          return "?error=unauthorized";
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return "?error=auth_error";
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        try {
          const { data: userData } = await supabase
            .from("users")
            .select("is_admin, id")
            .eq("email", user.email!)
            .single();

          if (userData) {
            token.id = userData.id;
            token.isAdmin = userData.is_admin;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      if (trigger === "update" && session?.user) {
        token = { ...token, ...session.user };
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
