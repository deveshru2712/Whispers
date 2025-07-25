import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/actions/post.actions";
import { Pencil } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {session?.user && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back{session.user.name ? ` ${session.user.name}` : ""}.
            </h1>
            <p className="text-muted-foreground mb-6">
              Share your thoughts and ideas with the world. Create your first
              post to get started!
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
                is_mine={post.user_id == session?.user.id}
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
              {session?.user
                ? "Your audience is waiting for your content!"
                : "Check back later for updates"}
            </p>
          </div>
        )}
      </main>

      {session?.user && (
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
      )}
    </div>
  );
}
