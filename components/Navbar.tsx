import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
      <nav className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:scale-105 transition-transform duration-300"
          >
            Whispers
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="text-slate-200 text-base font-semibold flex items-center gap-12">
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative group hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-50/20 px-2 py-1 rounded-xl group  transition-all duration-300 focus-within:border-slate-100/60 focus-within:ring-1 focus-within:ring-slate-100/30">
            <Search
              size={18}
              className="text-slate-300 group-focus-within:text-white transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none text-slate-200 placeholder-slate-400 w-full"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
