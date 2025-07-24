"use server";
import { auth } from "@/auth";
import { createSupaBaseClient } from "../supabase";

export const createPosts = async ({ title, post }: createPostsProps) => {
  const session = await auth();
  const supabase = await createSupaBaseClient();

  if (!session) {
    return null;
  }

  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .insert({ post, title, user_id: session.user.id })
    .select();

  if (blogError || !blogData) {
    console.log(blogError);
    throw new Error(blogError?.message || "Failed to create a post");
  }

  console.log("blog", blogData);

  return blogData[0];
};

export const fetchPosts = async (page = 1, limit = 9): Promise<Post[]> => {
  const supabase = await createSupaBaseClient();

  const query = supabase.from("blogs").select();
  query.range((page - 1) * limit, page * limit - 1);
  const { data: fetchedData, error: fetchingPostError } = await query;
  if (fetchingPostError) {
    console.log(fetchingPostError);
    throw new Error(fetchingPostError?.message || "Failed to fetch posts");
  }

  return fetchedData;
};

export const fetchPostById = async (postId: string): Promise<Post> => {
  const supabase = await createSupaBaseClient();

  const { data: post, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", postId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error?.message || "Unable to fetch the blog.");
  }

  return post;
};
