import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthProvider";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-urbanist'
});

export const metadata: Metadata = {
  title: "OmniNG",
  description: "OmniNG",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${urbanist.variable}`}>
      <body
        className={`antialiased min-h-screen relative bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans`}
      >
        <AuthProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
        </AuthProvider>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
