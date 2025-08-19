import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string;
    user: {
      address: string;
    } & DefaultSession["user"];
  }
}

declare global {
  interface createPostsProps {
    title: string;
    content: string;
  }

  interface updatePostsProps {
    title: string;
    content: string;
    blog_id: string;
  }

  interface PostCardProps {
    className?: string;
    id: string;
    title: string;
    createdAt: Date | string;
  }

  interface Post {
    id: string;
    title: string;
    content: string;
    created_at: Date;
    user_id: string;
  }

  interface PostPage {
    params: Promise<{
      id: string;
    }>;
  }

  interface ImageUploaderProps {
    session: import("next-auth").Session;
    file: File;
  }

  interface UploadResult {
    path: string;
    publicUrl: string;
  }

  interface deletePostProps {
    session: import("next-auth").Session;
    blog_id: string;
  }
}
