"use client";
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import { fetchPostByUser } from "@/lib/actions/post.actions";
import { getUserInfo } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    const getUserDetails = async (userId: string) => {
      try {
        setLoading(true);

        // Use Promise.allSettled to handle both requests independently
        const [userResult, blogsResult] = await Promise.allSettled([
          getUserInfo(userId),
          fetchPostByUser(userId),
        ]);

        let userData = null;
        let userBlogs = null;

        if (userResult.status === "fulfilled") {
          userData = userResult.value;
        } else {
          console.error("Failed to fetch user info:", userResult.reason);
          toast.error("Failed to load user information");
        }

        if (blogsResult.status === "fulfilled") {
          // userBlogs = blogsResult.value;
          userBlogs = [];
          // userBlogs = blogsResult.value;
        } else {
          console.error("Failed to fetch user posts:", blogsResult.reason);
          toast.error("Failed to load your posts");
        }

        setUser(userData);
        setBlogs(userBlogs);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      getUserDetails(session.user.id);
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (!session || loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!session && !loading) {
    toast.error("Please sign in to view your profile");
    router.push("/");
    return null;
  }

  const isMine = session.user.id === user?.id;

  return (
    <div className="min-h-screen w-full ">
      <div className="max-w-4xl h-full flex flex-col gap-8 justify-start items-center mx-auto px-4 py-12 md:px-8">
        <div className="w-full text-center">
          <h1 className="font-bold text-2xl md:text-3xl">My Profile</h1>
          <p className="mt-2 text-base text-gray-600">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full md:w-4/5 lg:w-2/3 rounded-xl shadow-md overflow-hidden border ">
          <div className="py-5 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold ">{user?.name}</h2>
              </div>
              <button className="px-4 py-2 bg-black border text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-300">
                Edit Profile
              </button>
            </div>

            <div className="my-4 border-t"></div>

            <div className="mt-2">
              <h3 className="font-semibold ">About</h3>
              <p className="text-gray-600 mt-1">
                {user?.bio || "No bio provided yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Blog showcase */}
        <div className="w-full md:w-4/5 lg:w-2/3">
          <h3 className="text-xl font-medium  mb-4">
            {isMine ? "Your Writings" : "Discover More Writings"}
          </h3>
          <div className="w-full space-y-4">
            {blogs && blogs.length > 0 ? (
              blogs.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  className="w-full"
                  createdAt={post.created_at}
                  title={post.title}
                />
              ))
            ) : (
              <div className="text-center py-8">
                {isMine && blogs?.length == 0 && (
                  <div>
                    <p className="">You haven&apos;t written any posts yet.</p>
                    <button
                      className="mt-4 cursor-pointer px-4 py-2 dark:bg-neutral-100 dark:text-black text-white bg-black font-semibold rounded-lg  transition-colors"
                      onClick={() => router.push("/posts/create")}
                    >
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
