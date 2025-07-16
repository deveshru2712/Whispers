"use server";
import { auth } from "@/auth";
import { createSupaBaseClient } from "../supabase";

export const createPosts = async (post: string) => {
  const session = await auth();
  const supabase = createSupaBaseClient();

  if (!session || !session.user.isAdmin) return null;

  const { data: blogData, error } = await supabase
    .from("blog")
    .insert({ post, user_id: session.user.id })
    .select();

  if (error || !blogData) {
    console.log(error);
    throw new Error(error?.message || "Failed to create a companion");
  }

  return blogData[0];
};
