import { createClient } from "@supabase/supabase-js";
import { type Session } from "next-auth";

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Missing Supabase environment variables:
      URL: ${supabaseUrl ? "✓" : "✗"} 
      KEY: ${supabaseKey ? "✓" : "✗"}
    `);
  }

  return createClient(supabaseUrl, supabaseKey);
};

export const createSupabaseAuthenticatedClient = (session: Session) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Missing Supabase environment variables:
      URL: ${supabaseUrl ? "✓" : "✗"} 
      KEY: ${supabaseKey ? "✓" : "✗"}
    `);
  }

  if (!session?.supabaseAccessToken) {
    console.warn("No supabaseAccessToken found in session");
    return createClient(supabaseUrl, supabaseKey);
  }

  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${session.supabaseAccessToken}`,
      },
    },
  });
};
