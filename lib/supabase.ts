import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

export const createSupaBaseClient = async () => {
  const session = await auth();
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
};
