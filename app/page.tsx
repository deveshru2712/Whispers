import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/actions/post.actions";
import { Pencil } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { getUserInfo } from "@/lib/actions/user.action";

export default async function HomePage() {
  const session = await auth();
  const posts = await fetchPosts();

  let user = null;
  if (session?.user?.id) {
    user = await getUserInfo(session.user.id);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {session?.user ? (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back{user?.name ? ` ${user.name}` : ""}.
            </h1>
            <p className="text-muted-foreground mb-6">
              Share your thoughts and ideas with the world.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to our community!
            </h1>
            <p className="text-muted-foreground mb-6">
              Join us to share your thoughts and ideas with the world. Sign up
              to create posts and connect with other members.
            </p>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="mx-auto max-w-4xl flex flex-col items-center space-y-1.5">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                createdAt={post.created_at}
                title={post.title}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              {session?.user
                ? "No posts yet - time to create something amazing!"
                : "No posts available yet"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {session?.user ? "Write a word to share it!" : "Sign up to post!"}
            </p>
            {!session?.user && (
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            )}
          </div>
        )}
      </main>

      {session?.user ? (
        <div className="fixed bottom-6 right-6">
          <Button
            asChild
            className="rounded-lg shadow-lg h-14 w-14 p-0 md:h-auto md:w-auto md:px-4 md:py-2"
          >
            <Link href="/posts/create" className="flex items-center">
              <Pencil className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Create Post</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="fixed bottom-6 right-6">
          <Button
            asChild
            className="rounded-lg shadow-lg h-14 w-14 p-0 md:h-auto md:w-auto md:px-4 md:py-2 bg-primary hover:bg-primary/90"
          >
            <Link href="/auth/signin" className="flex items-center">
              <Pencil className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Join Now</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
