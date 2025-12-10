"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/actions/auth";
import { useAuth } from "@/context/AuthProvider";

const navLinks = [
    { name: "News", href: "/news" },
    { name: "Officials", href: "/officials" },
    { name: "Proposals", href: "/proposals" },
    { name: "Solutions", href: "/solutions" },
    { name: "Map", href: "/map" },
];

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const { user, refreshUser } = useAuth();

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("login_success")) {
            refreshUser();

            toast.success("Welcome back! You have successfully logged in.", {
                style: {
                    background: '#2e7d32',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#10B981',
                },
            });
            router.replace(pathname);
        }

        if (searchParams.get("signup_success")) {
            refreshUser();

            toast.success("Account created! Welcome to the movement.", {
                style: {
                    background: '#10B981',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#10B981',
                },
            });
            router.replace(pathname);
        }
    }, [searchParams, refreshUser, pathname, router]);

    const handleLogout = async () => {
        await logout();
        await refreshUser();

        toast.success("You have been logged out.", {
            style: {
                background: '#333',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
            },
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-black text-green-700 dark:text-green-700 z-50">
                        Omni<span className="text-zinc-700 dark:text-white">NG</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isSubPage = pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "relative text-sm font-medium transition-colors hover:text-green-700",
                                            isActive || isSubPage ? "text-green-700" : "text-zinc-600 dark:text-zinc-300"
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

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-xl transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 font-bold overflow-hidden">

                                        <UserIcon className="w-4 h-4" />
                                    </div>
                                    {/* <span className="text-sm font-bold text-zinc-900 dark:text-white hidden lg:block">
                                        {user.user_metadata?.full_name?.split(' ')[0]}
                                    </span> */}
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                                                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                                                    {user.user_metadata?.full_name}
                                                </p>
                                                <p className="text-xs text-zinc-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    handleLogout();
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/join"
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-700/20"
                            >
                                Register
                            </Link>
                        )}
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
                                                ? "bg-yellow-50 dark:bg-yellow-900/20 text-green-600 dark:text-green-400"
                                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                {user ? (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-center px-5 py-3 text-base font-bold text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                ) : (
                                    <Link
                                        href="/join"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-5 py-3 text-base font-bold text-white bg-green-700 rounded-xl hover:bg-green-700 transition-colors"
                                    >
                                        Register Now
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;