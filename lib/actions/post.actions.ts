"use server";
import { auth } from "@/auth";
import {
  createSupabaseClient,
  createSupabaseAuthenticatedClient,
} from "../supabase";

export const createPosts = async ({ title, content }: createPostsProps) => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const supabase = createSupabaseAuthenticatedClient(session);

  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .insert({ content, title, user_id: session.user.id })
    .select();

  if (blogError || !blogData) {
    console.log(blogError);
    throw new Error(blogError?.message || "Failed to create a post");
  }

  console.log("blog", blogData);

  return blogData[0];
};

export const fetchPosts = async (page = 1, limit = 9): Promise<Post[]> => {
  const supabase = createSupabaseClient();

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
  const supabase = createSupabaseClient();

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

export const updatePosts = async ({
  title,
  content,
  blog_id,
}: updatePostsProps) => {
  const session = await auth();
  if (!session) return null;

  const supabase = createSupabaseAuthenticatedClient(session);

  const { data, error: updateError } = await supabase
    .from("blogs")
    .update({ title, content })
    .eq("id", blog_id)
    .select();

  if (updateError) {
    console.log(updateError);
    throw new Error(updateError?.message || "Failed to update the post");
  }

  return data;
};

export const deletePosts = async ({ blog_id, session }: deletePostProps) => {
  if (!session) return null;
  if (!blog_id) return null;

  const supabase = createSupabaseAuthenticatedClient(session);

  const { data, error: deleteError } = await supabase
    .from("blogs")
    .delete()
    .eq("id", blog_id)
    .select();

  if (deleteError) {
    console.log(deleteError.message);
    throw new Error(
      deleteError.message || "Error occurred while deleting the post."
    );
  }

  return data;
};
