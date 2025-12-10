"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex">
            {/* Desktop Sidebar */}
            <AdminSidebar className="hidden md:flex sticky top-0" />

            {/* Mobile Sidebar (Drawer) */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <AdminSidebar
                        className="absolute top-0 left-0 h-full w-64 z-10 shadow-2xl animate-in slide-in-from-left duration-200"
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto flex flex-col min-h-screen">
                <header className="h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:hidden sticky top-0 z-40">
                    <span className="font-bold text-lg">OmniNG Admin</span>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -mr-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>
                <div className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
