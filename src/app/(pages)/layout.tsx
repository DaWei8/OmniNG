import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/context/AuthProvider"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-funnel relative w-screen max-w-screen bg-white dark:bg-gray-950 min-h-screen antialiased">
      <AuthProvider>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
      </AuthProvider>
      <Toaster position="top-center" />
      <Footer />
    </div>
  )
}