import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
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
          return "/?error=unauthorized";
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return "/?error=auth_error";
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        try {
          const { data: userData } = await supabase
            .from("users")
            .select("is_admin")
            .eq("id", user.id)
            .single();

          token.id = user.id;
          token.isAdmin = userData?.is_admin || false;
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
