"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { createPosts } from "@/lib/actions/post.actions";
import { BookCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const [post, setPost] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onChange = (post: string) => {
    setPost(post);
    console.log(post);
  };

  const handleSubmit = async () => {
    const data = await createPosts(post);
    console.log(data);
    toast.success("Post created successfully");
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [post]);

  return (
    <main className="container relative mx-auto px-4 pt-24 pb-12 md:pt-26">
      <div className="flex flex-col items-center">
        <div className="text-center max-w-2xl w-full mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-gray-100 text-gray-800">
            What&apos;s on your mind today, Yash?
          </h1>
          <p className="text-sm md:text-base dark:text-gray-400 text-gray-500">
            Pen down your thoughts, ideas, or anything you want to remember...
          </p>
        </div>

        <div className="w-full max-w-4xl min-h-[400px] md:min-h-[calc(100vh-250px)] border rounded-lg shadow-lg dark:shadow-2xl p-6">
          <SimpleEditor post={post} OnChange={onChange} />
        </div>

        <Button
          ref={buttonRef}
          onClick={handleSubmit}
          className="flex items-center absolute z-10 bottom-10 right-10 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md shadow dark:shadow-2xl cursor-pointer"
        >
          <BookCheck />
          Publish
        </Button>
      </div>
    </main>
  );
}
