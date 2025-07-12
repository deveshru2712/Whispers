"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { Toggle } from "./Toggle";

export default function Navbar() {
  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-black/90 dark:text-slate-200"
          >
            Whispers
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="text-black/90 dark:text-slate-400 text-base font-semibold flex items-center gap-12">
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-slate-500 dark:hover:text-slate-100 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-slate-500 dark:hover:text-slate-100 transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-slate-500 dark:hover:text-slate-100 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 border border-slate-300 dark:border-slate-500/30 px-2 py-1 rounded-xl group transition-all duration-300 focus-within:border-slate-700 focus-within:ring-1 focus-within:ring-slate-70030 dark:focus-within:border-slate-200 dark:focus-within:ring-slate-800/30">
              <Search
                size={22}
                className="text-slate-950 dark:text-white font-semibold transition-colors duration-300"
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 w-full"
              />
            </div>

            <Toggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
