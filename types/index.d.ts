import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    isAdmin?: boolean;
  }

  interface JWT {
    id: string;
    isAdmin: boolean;
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
}
