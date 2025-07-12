import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
