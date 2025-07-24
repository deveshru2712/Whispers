import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

export const createSupaBaseClient = async (requireAuth = false) => {
  const session = await auth();

  if (requireAuth == true && !session) {
    console.error("No valid session found when authentication was required");
    throw new Error("Authentication required but no valid session found");
  }

  if (requireAuth && session) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${session?.supabaseAccessToken}`,
          },
        },
      }
    );
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
