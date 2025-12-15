"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal dark:bg-green-500/5 animate-blob"></div>
                <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal dark:bg-blue-500/5 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal dark:bg-yellow-500/5 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-2xl relative z-10">
                {/* 404 Mascot Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative h-64 w-full flex items-center justify-center"
                >
                    {/* Flag Body */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <div className="relative w-40 h-32 flex">
                            {/* Flag Pole */}
                            <div className="w-2 h-64 bg-zinc-400 absolute left-0 top-0 -translate-x-full rounded-l-full"></div>
                            {/* Flag Segments - Green White Green */}
                            <motion.div
                                animate={{ skewY: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-1/3 h-full bg-green-600 origin-left"
                            />
                            <motion.div
                                animate={{ skewY: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
                                className="w-1/3 h-full bg-white origin-left border-y border-zinc-100 dark:border-zinc-800"
                            />
                            <motion.div
                                animate={{ skewY: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
                                className="w-1/3 h-full bg-green-600 origin-left"
                            />

                            {/* Ripple Overlay for 3D effect */}
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-50"
                            />
                        </div>

                        {/* Floating Question Marks - Keeping them for 404 vibe */}
                        <motion.div
                            animate={{ y: [0, -15, 0], opacity: [0, 1, 0], x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                            className="absolute -top-12 -right-8 text-6xl font-black text-zinc-200 dark:text-zinc-700 transform rotate-12"
                        >
                            ?
                        </motion.div>
                    </div>

                    {/* Shadow */}
                    <div className="absolute bottom-4 w-32 h-4 bg-black/10 dark:bg-white/5 rounded-[100%] blur-md animate-pulse"></div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl font-black text-zinc-900 dark:text-white mb-2 tracking-tighter"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 font-medium"
                >
                    Oops! Looks like this page got lost in the data stream.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-green-500/25 flex items-center gap-2 group"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-8 text-sm text-zinc-400">
                OmniNG System Error
            </div>
        </div>
    );
}
