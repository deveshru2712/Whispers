"use client";

import Loader from "@/components/Loader";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { deletePosts, fetchPostById } from "@/lib/actions/post.actions";
import formatTime from "@/lib/formatTime";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { data: session } = useSession();

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  const is_mine = post?.user_id === session?.user.id;

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Post not found.</h1>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!session) return null;

    try {
      await deletePosts({ blog_id: post.id, session });
      toast.success("Post deleted.");
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="w-full min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link href="/">
          <button className="cursor-pointer flex items-center px-2 py-1 rounded-md border hover:border-slate-300 dark:border-slate-50/40 hover:dark:border-slate-50/80 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-300 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:dark:text-slate-50">
            <ArrowLeft size={20} />
            <span className="font-semibold pl-1">Back</span>
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full px-8 md:px-4 lg:px-0">
        <div>
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight leading-tight hover:opacity-90 transition-opacity break-words overflow-hidden">
                {post.title}
              </h1>
              <p className="text-sm opacity-75">
                {formatTime(post.created_at)}
              </p>
            </header>

            <div className="bg-white/80 dark:bg-white/5 rounded-md shadow dark:shadow-2xl">
              <SimpleEditor content={post.content} isEditable={false} />
            </div>
          </div>

          {is_mine && (
            <div className="flex flex-col space-y-3 fixed bottom-10 right-10">
              <Link
                href={`/posts/update/${post.id}`}
                className="flex gap-1 bg-blue-400 hover:bg-blue-300 transition-all duration-300 px-4 py-1.5 rounded-md text-white font-semibold cursor-pointer"
              >
                <Pencil /> Update
              </Link>

              <Button
                onClick={handleDelete}
                className="flex gap-1 bg-red-500 hover:bg-red-400 transition-all duration-300 px-4 py-1.5 rounded-md text-white font-semibold cursor-pointer"
              >
                <Trash /> Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
