import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async (requireAuth: boolean = false) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  }

  let session = null;
  if (requireAuth) {
    session = await auth();
    if (!session) {
      throw new Error("Authentication required but no valid session found");
    }

    if (!session.supabaseAccessToken) {
      throw new Error("Session found but missing supabaseAccessToken");
    }
  }

  const options =
    requireAuth && session
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${session.supabaseAccessToken}`,
            },
          },
        }
      : undefined;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
  );
};
