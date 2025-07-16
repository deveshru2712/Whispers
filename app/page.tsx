import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Blog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Share your thoughts and ideas with the world. Create your first post
            to get started!
          </p>
        </div>
      </main>

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
    </div>
  );
}
