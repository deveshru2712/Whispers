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
    post: string;
  }

  interface PostCardProps {
    id: string;
    title: string;
    createdAt: Date | string;
  }

  interface Post {
    id: string;
    title: string;
    post: string;
    created_at: Date;
  }

  interface PostPage {
    params: Promise<{
      id: string;
    }>;
  }

  interface ImageUploaderProps {
    userId: string;
    file: File;
  }

  interface UploadResult {
    path: string;
    publicUrl: string;
  }
}
