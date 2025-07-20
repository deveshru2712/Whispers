"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/actions/post.actions";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<string[] | []>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const blog = await fetchPosts();
        setPosts(blog);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-1 p-4 relative">
        {session && session.user.isAdmin && !loading && (
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome back Yash.</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Share your thoughts and ideas with the world. Create your first
              post to get started!
            </p>
          </div>
        )}

        <div className="max-w-6xl h-[calc(100vh-104px)] mx-auto">
          {loading ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="text-white">post</div>
          ) : session?.user.isAdmin ? (
            <div className="w-full h-full flex justify-center items-center text-2xl tracking-tight font-bold text-slate-900 dark:text-slate-300">
              You lazy ass, create some blogs for people to read.😭😭
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-2xl tracking-tight font-bold text-slate-900 dark:text-slate-300">
              Nothing here.😭😭
            </div>
          )}
        </div>
      </main>

      {session && session.user.isAdmin && !loading && (
        <div className="fixed bottom-6 right-6">
          <Button
            asChild
            className="rounded-md px-2.5 py-1.5 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link href="/posts/create">
              <Pencil className="mr-2" size={20} />
              <span>Create a Post</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
