"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, CheckSquare, Lightbulb, LogOut, Settings, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { logout } from "@/actions/auth";

const navLink = [
    {
        href: "/admin",
        label: "Overview",
        icon: LayoutDashboard
    },
    {
        href: "/admin/news",
        label: "Manage News",
        icon: FileText
    },
    {
        href: "/admin/proposals",
        label: "Moderate Proposals",
        icon: CheckSquare
    },
    {
        href: "/admin/solutions",
        label: "Community Solutions",
        icon: Lightbulb
    },
];

export default function AdminSidebar({ className, onClose }: { className?: string, onClose?: () => void }) {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className={clsx("w-72 h-screen bg-zinc-950 text-white flex flex-col border-r border-zinc-900 shrink-0", className)}>
            {/* Header */}
            <div className="p-6 pb-2">
                <Link href="/admin" className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight tracking-tight">OmniNG</h1>
                        <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Admin Portal</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Main Menu</p>
                {navLink.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-white/10 text-white font-medium shadow-inner"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-green-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                            <span className="relative z-10">{link.label}</span>
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full" />
                            )}
                        </Link>
                    )
                })}

                <p className="px-4 text-xs font-bold text-zinc-600 uppercase tracking-widest mt-8 mb-4">System</p>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left">
                    <Settings className="w-5 h-5 text-zinc-500" />
                    Settings
                </button>
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-zinc-900 bg-black/20">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-green-500 to-emerald-700 flex items-center justify-center text-sm font-bold shadow-lg">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Administrator</p>
                        <p className="text-xs text-zinc-500 truncate">admin@whathappening.ng</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 text-sm font-medium rounded-lg transition-colors border border-red-500/20"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
