"use client";
import Loader from "@/components/Loader";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPostById, updatePosts } from "@/lib/actions/post.actions";
import { BookCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const getPost = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        const blog = await fetchPostById(id);
        setContent(blog.content);
        setTitle(blog.title);
        setOriginalContent(blog.content);
        setOriginalTitle(blog.title);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        toast.error("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [id]);

  const onChange = (post: string) => {
    console.log(post);
    setContent(post);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please add a title and content before publishing");
      return;
    }

    try {
      setIsUpdating(true);
      await updatePosts({ blog_id: id, title, content: content });
      toast.success("Post updated successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update the post");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (buttonRef.current && content) {
      buttonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [content]);

  // Check if content or title has changed from original
  const hasChanges = content !== originalContent || title !== originalTitle;

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container relative mx-auto px-4 pt-26 pb-32">
      <div className="flex flex-col items-center">
        <div className="text-center max-w-2xl w-full mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-gray-100 text-gray-800">
            Make changes to your thoughts and ideas...
          </h1>
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
              isEditable={true}
              content={content}
              onChange={onChange}
              session={session ? session : undefined}
            />
          </div>
        </div>

        <Button
          ref={buttonRef}
          onClick={handleSubmit}
          disabled={
            isUpdating || !content.trim() || !title.trim() || !hasChanges
          }
          className="cursor-pointer fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg transition-all z-50"
        >
          {isUpdating ? (
            "Updating..."
          ) : (
            <>
              <BookCheck className="mr-2 h-4 w-4" />
              Update
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
