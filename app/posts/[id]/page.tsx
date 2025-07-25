import { auth } from "@/auth";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { fetchPostById } from "@/lib/actions/post.actions";
import formatTime from "@/lib/formatTime";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: PostPage) {
  const session = await auth();
  const { id: postId } = await params;
  const post = await fetchPostById(postId);

  const is_mine = post.user_id == session?.user.id;

  return (
    <div className="w-full min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-6  py-6">
        <Link href="/">
          <button className="cursor-pointer flex items-center px-2 py-1 rounded-md border hover:border-slate-300 dark:border-slate-50/40 hover:dark:border-slate-50/80 shadow-md dark:shadow-2xl transition-all duration-300 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:dark:text-slate-50  ">
            <ArrowLeft size={20} />
            <span className="font-semibold pl-1">Back</span>
          </button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full px-8 md:px-4 lg:px-0">
        <div>
          <article className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight leading-tight hover:opacity-90 transition-opacity">
                {post.title}
              </h1>
              <p className="text-sm opacity-75">
                {formatTime(post.created_at)}
              </p>
            </header>

            <div className="bg-white/80 dark:bg-white/5 rounded-md shadow dark:shadow-2xl">
              <SimpleEditor content={post.content} isEditable={false} />
            </div>
          </article>

          {is_mine && (
            <div className="flex flex-col space-y-3 absolute bottom-10 right-10">
              <Button className="flex gap-1 bg-blue-400 hover:bg-blue-300 transition-all duration-300 px-4 py-1.5 rounded-md text-white font-semibold cursor-pointer">
                <Pencil /> Update
              </Button>

              <Button className="flex gap-1 bg-red-500 hover:bg-red-400 transition-all duration-300 px-4 py-1.5 rounded-md text-white font-semibold cursor-pointer">
                <Trash /> Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
