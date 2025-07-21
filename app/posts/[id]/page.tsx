// import { fetchPostById } from "@/lib/actions/post.actions";
// import formateTime from "@/lib/formatTime";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default async function Page({ params }: PostPage) {
//   const postId = params.id;
//   const post = await fetchPostById(postId);
//   console.log(post);

//   return (
//     <div className="w-full h-screen">
//       <div className="max-w-6xl mx-auto w-full h-full mt-12 px-6 md:px-12">
//         <div className="flex flex-col space-y-9">
//           <Link href={"/"}>
//             <button className="flex px-4 py-1.5 rounded-lg items-center bg-transparent border shadow dark:shadow-2xl cursor-pointer text-slate-950 dark:text-slate-50">
//               <ArrowLeft />
//               Back
//             </button>
//           </Link>

//           <div>
//             <h1 className="text-2xl font-semibold dark:text-slate-50/80 hover:dark:text-slate-50 text-slate-900 hover:text-slate-600 cursor-pointer ">
//               {post.title}
//             </h1>
//             <span className="text-slate-600 dark:text-slate-300 text-sm">
//               {formateTime(post.createdAt)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { fetchPostById } from "@/lib/actions/post.actions";
import formateTime from "@/lib/formatTime";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: PostPage) {
  const postId = params.id;
  const post = await fetchPostById(postId);

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-3xl mx-auto w-full py-16 px-4 sm:px-6">
        <div className="flex flex-col gap-8">
          <div>
            <Link href="/">
              <button className="cursor-pointer flex items-center px-2 py-1 rounded-md border hover:border-slate-300 dark:border-slate-50/40 hover:dark:border-slate-50/80 shadow-md dark:shadow-2xl transition-all duration-300 text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:dark:text-slate-50  ">
                <ArrowLeft size={20} />
                <span className="font-semibold pl-1">Back</span>
              </button>
            </Link>
          </div>

          <article className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight leading-tight hover:opacity-90 transition-opacity">
                {post.title}
              </h1>
              <p className="text-sm opacity-75">
                {formateTime(post.createdAt)}
              </p>
            </header>

            <div className="prose max-w-none p-6 rounded-lg shadow-sm bg-white/5">
              {/* Add your post content here when available */}
              {/* <p>{post.content}</p> */}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
