"use server";

import { createSupabaseClient } from "../supabase";

export const getUserInfo = async (userId: string): Promise<User | null> => {
  if (!userId) return null;

  const supabase = createSupabaseClient();
  const { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .select("name,bio,id");

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Unable to fetch user information.");
  }

  return user[0];
};
