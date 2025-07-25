import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { MoveUpRight, Pencil } from "lucide-react";

const PostCard = ({ id, title, createdAt, is_mine }: PostCardProps) => {
  return (
    <div className="group w-1/2 flex justify-between items-center">
      <Link
        href={`/posts/${id}`}
        className="block p-4 rounded-lg transition-colors duration-200 relative"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between h-full text-left">
            <div className="w-full text-xl font-semibold line-clamp-2">
              {title}
            </div>
            <div className="absoulte border group-hover:border-slate-900/20 group-hover:dark:border-slate-50/30 border-transparent -mt-0.5 transition-colors duration-300" />

            <div className="text-sm flex items-center gap-0.5 mt-0.5">
              <span className="text-slate-600 dark:text-slate-300">
                {dayjs(createdAt).format("MMM D, YYYY")}
              </span>
              <MoveUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </Link>

      {is_mine && (
        <Link
          href={`/posts/update/${id}`}
          className="group-hover:block hidden duration-500 transition-all cursor-pointer"
        >
          <Pencil size={16} />
        </Link>
      )}
    </div>
  );
};

export default PostCard;
