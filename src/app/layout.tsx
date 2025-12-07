import type { Metadata } from "next";
//use the Urbanist font
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const urbanistMono = Urbanist({
  variable: "--font-urbanist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGlance",
  description: "NGlance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${urbanistMono.variable} antialiased bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white`}
      >
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <a href="/" className="text-xl font-bold text-green-600 dark:text-green-500">
                  NGlance
                </a>
                <div className="hidden md:flex items-center gap-6">
                  <a href="/" className="text-sm font-medium hover:text-green-600 transition-colors">Map</a>
                  <a href="/news" className="text-sm font-medium hover:text-green-600 transition-colors">News</a>
                  <a href="/officials" className="text-sm font-medium hover:text-green-600 transition-colors">Officials</a>
                  <a href="/forum" className="text-sm font-medium hover:text-green-600 transition-colors">Forum</a>
                  <a href="/leaderboard" className="text-sm font-medium hover:text-green-600 transition-colors">Leaderboard</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors">
                  Join Movement
                </button>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
