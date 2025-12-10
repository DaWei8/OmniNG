"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, CheckSquare, Lightbulb, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
        label: "Add Solutions",
        icon: Lightbulb
    },
];

export default function AdminSidebar({ className, onClose }: { className?: string, onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <aside className={clsx("w-64 h-screen bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 flex flex-col", className)}>
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <Link href="/admin" className="text-xl font-bold text-green-600 flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6" />
                    OmniNG Admin
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navLink.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/admin" && pathname.includes(link.href));

                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={clsx("flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors", {
                                "bg-green-700-30 dark:bg-green-700-30 text-green-600 dark:text-green-400": isActive,
                            })}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    Exit Admin
                </Link>
            </div>
        </aside>
    );
}
