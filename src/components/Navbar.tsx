"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Map", href: "/map" },
    { name: "News", href: "/news" },
    { name: "Officials", href: "/officials" },
    { name: "Proposals", href: "/proposals" },
];

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-black text-green-600 dark:text-green-500 z-50">
                        Omni<span className="text-zinc-700 dark:text-white">NG</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                //also for sub pages
                                const isSubPage = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "relative text-sm font-medium transition-colors hover:text-green-500",
                                            isActive || isSubPage ? "text-green-500" : "text-zinc-600 dark:text-zinc-300"
                                        )}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400 rounded-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        <Link
                            href="/join"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 z-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isSubPage = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={clsx(
                                            "text-lg font-medium px-4 py-2 rounded-xl transition-colors",
                                            isActive || isSubPage
                                                ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <Link
                                    href="/join"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center px-5 py-3 text-base font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
                                >
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;