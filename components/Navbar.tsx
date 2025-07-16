"use client";
import Link from "next/link";
import { Toggle } from "./Toggle";

export default function Navbar() {
  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 "
          >
            Whispers
          </Link>

          <Toggle />
        </div>
      </nav>
    </div>
  );
}
