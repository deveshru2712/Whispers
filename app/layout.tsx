import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Overlay from "@/components/Overlay";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Whisper | Thought of my life",
    template: "%s | Whisper",
  },
  description:
    "Insightful articles, tutorials, and stories about web development, programming, and technology and my Life.",
  keywords: [
    "blog",
    "web development",
    "programming",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "coding",
    "lifestyle",
    "mythoughts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased h-screen w-screen transition-colors duration-300 ease-in-out`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen fixed -z-50 pointer-events-none">
              <Overlay />
            </div>
            <div className="relative z-10 min-h-screen">{children}</div>
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
