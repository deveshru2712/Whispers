import { auth } from "@/auth";
import PostCard from "@/components/PostCard";
import { fetchPostByUser } from "@/lib/actions/post.actions";
import { getUserInfo } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }

  const [user, blogs] = await Promise.all([
    getUserInfo(session.user.id),
    fetchPostByUser(session.user.id),
  ]);

  if (!user) return null;

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-4xl h-full flex flex-col gap-8 justify-start items-center mx-auto px-4 py-12 md:px-8">
        <div className="w-full text-center">
          <h1 className="font-bold text-4xl md:text-5xl">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="w-full md:w-4/5 lg:w-2/3 rounded-xl shadow-md overflow-hidden border">
          <div className="pt-16 px-6 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{session.user.name}</h2>
              </div>
              <button className="px-4 py-2 bg-slate-950 border hover:bg-slate-900 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors duration-300">
                Edit Profile
              </button>
            </div>

            <div className="my-4 border-t"></div>

            <div className="mt-6">
              <h3 className="font-semibold">About</h3>
              <p className="text-gray-600 mt-1">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* Blog showcase */}
        <div className="w-full md:w-4/5 lg:w-2/3">
          <span className="text-xl font-medium px-8">
            Discover more Writings
          </span>
          <div className="w-full">
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
              <p>You haven&apos;t written any posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
