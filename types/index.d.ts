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
}
