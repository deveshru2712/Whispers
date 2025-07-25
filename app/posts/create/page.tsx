"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPosts } from "@/lib/actions/post.actions";
import { BookCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: session } = useSession();

  const router = useRouter();

  const onChange = (post: string) => {
    setPost(post);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !post.trim()) {
      toast.error("Please add a title and content before publishing");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(title, post);
      await createPosts({ title, content: post });
      toast.success("Post created successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to create post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (buttonRef.current && post) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [post]);

  return (
    <main className="container relative mx-auto px-4 pt-26 pb-32">
      <div className="flex flex-col items-center">
        <div className="text-center max-w-2xl w-full mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-gray-100 text-gray-800">
            What&apos;s on your mind today, Yash?
          </h1>
          <p className="text-sm md:text-base dark:text-gray-400 text-gray-500">
            Pen down your thoughts, ideas, or anything you want to remember...
          </p>
        </div>

        <div className="w-full max-w-4xl border rounded-lg shadow-lg dark:shadow-2xl p-6">
          <div className="mb-4">
            <Label htmlFor="post-title" className="text-left w-full mb-2 block">
              Title
            </Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A title for your post..."
              className="w-full"
            />
          </div>

          <div className="min-h-[400px]">
            <SimpleEditor
              post={post}
              OnChange={onChange}
              session={session ? session : undefined}
            />
          </div>
        </div>

        <Button
          ref={buttonRef}
          onClick={handleSubmit}
          disabled={isSubmitting || !post.trim() || !title.trim()}
          className="cursor-pointer fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg transition-all z-50"
          aria-label="Publish post"
        >
          {isSubmitting ? (
            "Publishing..."
          ) : (
            <>
              <BookCheck className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
