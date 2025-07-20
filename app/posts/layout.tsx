"use client";

import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
}
