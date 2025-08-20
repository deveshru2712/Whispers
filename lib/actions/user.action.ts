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

export const updateUserInfo = async (userId: string, form: UpdateForm) => {
  const supabase = createSupabaseClient();

  const { error: setUserIdError } = await supabase.rpc("set_user_id", {
    user_id: userId,
  });

  if (setUserIdError) {
    console.error("Set user ID error:", setUserIdError);
    throw setUserIdError;
  }

  const { data, error } = await supabase
    .from("users")
    .update(form)
    .eq("id", userId)
    .select("id, name, bio")
    .single();

  if (error) {
    console.error("Update error:", error);
    throw error;
  }

  return data;
};
