"use server";
import { auth } from "@/auth";
import { createSupaBaseClient } from "../supabase";

export const createPosts = async (post: string) => {
  const session = await auth();
  const supabase = createSupaBaseClient();

  if (!session || !session.user || !session.user.id || !session.user.isAdmin) {
    return null;
  }

  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .insert({ post, user_id: session.user.id })
    .select();

  if (blogError || !blogData) {
    console.log(blogError);
    throw new Error(blogError?.message || "Failed to create a post");
  }

  console.log("blog", blogData);

  return blogData[0];
};
