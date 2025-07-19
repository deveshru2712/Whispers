"use server";
import { auth } from "@/auth";
import { createSupaBaseClient } from "../supabase";

export const createPosts = async (post: string) => {
  const session = await auth();
  const supabase = createSupaBaseClient();

  if (!session || !session.user.isAdmin) return null;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();

  console.log("user", userData);

  if (userError || !userData) {
    console.log(userError);
    throw new Error(userError?.message || "Failed to find user");
  }

  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .insert({ post, user_id: userData.id })
    .select();

  if (blogError || !blogData) {
    console.log(blogError);
    throw new Error(blogError?.message || "Failed to create a post");
  }

  console.log("blog", blogData);

  return blogData[0];
};
