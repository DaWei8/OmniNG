"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, ChevronRight, Trophy, TrendingUp, TrendingDown, Activity, Medal, LayoutGrid, ListOrdered } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { officialsData } from '@/data/officialsData';

const topGovernors = [
    { rank: 1, name: "Babajide Sanwo-Olu", state: "Lagos", score: 92, trend: "up" },
    { rank: 2, name: "Abba Kabir Yusuf", state: "Kano", score: 88, trend: "up" },
    { rank: 3, name: "Prof. Chukwuma Soludo", state: "Anambra", score: 85, trend: "stable" },
];

const statePerformance = [
    { state: "Lagos", category: "Economy", score: 95, color: "bg-green-700" },
    { state: "Rivers", category: "Infrastructure", score: 88, color: "bg-blue-500" },
    { state: "Edo", category: "Digital Innovation", score: 82, color: "bg-purple-500" },
    { state: "Borno", category: "Resilience", score: 78, color: "bg-orange-500" },
];

const engagementLeaders = [
    { name: "Chinedu Okeke", contributions: 154, badge: "Community Voice" },
    { name: "Amina Yusuf", contributions: 132, badge: "Policy Expert" },
    { name: "Tunde Bakare", contributions: 98, badge: "Activist" },
];

export default function OfficialsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [viewMode, setViewMode] = useState<"directory" | "leaderboard">("directory");

    const filteredOfficials = officialsData.filter(official =>
        (filter === "All" || official.role === filter) &&
        (official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            official.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (official.position?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false))
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <div className="">
                <div className="relative bg-zinc-950 pt-20 pb-14 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/50" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                    <div className="max-w-5xl xl:max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">
                                    {viewMode === 'directory' ? 'Know Your Officials' : 'Performance Leaderboard'}
                                </h1>
                                <p className="text-xl text-zinc-400 max-w-2xl">
                                    {viewMode === 'directory'
                                        ? "Track performance, rate officials, and monitor campaign promises."
                                        : "Recognizing excellence and accountability in governance."}
                                </p>
                            </div>
                            {/* View Switcher */}
                            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex shrink-0 border border-white/10">
                                <button
                                    onClick={() => setViewMode("directory")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === "directory" ? "bg-green-700 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    Directory
                                </button>
                                <button
                                    onClick={() => setViewMode("leaderboard")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === "leaderboard" ? "bg-green-700 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <ListOrdered className="w-4 h-4" />
                                    Leaderboard
                                </button>
                            </div>
                        </div>

                        {/* Search and Filter (Only for Directory) */}
                        {viewMode === "directory" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative max-w-2xl flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search by name, state, or position..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all shadow-lg"
                                        />
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-0.5 md:pb-0 scrollbar-hide">
                                    {["All", "Governor", "Senator", "Minister", "Director"].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setFilter(role)}
                                            className={`px-4 min-w-16 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filter === role
                                                ? "bg-green-800 text-white"
                                                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="max-w-5xl xl:max-w-7xl pt-8 mx-auto px-4 pb-20">
                    <AnimatePresence mode="wait">
                        {viewMode === "directory" ? (
                            <motion.div
                                key="directory"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {filteredOfficials.map((official) => (
                                    <Link href={`/officials/${official.name}`} key={official.id} className="block h-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 hover:shadow-xl hover:border-green-700/30 transition-all group flex flex-col h-full"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0">

                                                        <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xl">
                                                            {official.name.charAt(0)}
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-green-700 transition-colors line-clamp-1">
                                                            {official.name}
                                                        </h3>
                                                        <p className="text-sm font-medium text-green-700 dark:text-green-700 line-clamp-2 min-h-[2.5em] leading-tight">
                                                            {official.position || `${official.role} • ${official.state}`}
                                                        </p>
                                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300">
                                                            {official.party}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg shrink-0">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-bold text-yellow-700 dark:text-yellow-500 text-sm">{official.rating || '-'}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 mb-6 mt-auto">
                                                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                    <span className="block text-lg font-bold text-green-700 dark:text-green-400">{official.promises.kept}</span>
                                                    <span className="text-xs text-zinc-500">Kept</span>
                                                </div>
                                                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                    <span className="block text-lg font-bold text-red-600 dark:text-red-400">{official.promises.broken}</span>
                                                    <span className="text-xs text-zinc-500">Broken</span>
                                                </div>
                                                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                    <span className="block text-lg font-bold text-blue-600 dark:text-blue-400">{official.promises.pending}</span>
                                                    <span className="text-xs text-zinc-500">Pending</span>
                                                </div>
                                            </div>

                                            <button className="w-full py-3 cursor-pointer rounded-xl border border-zinc-200 dark:border-zinc-700 font-medium dark:hover:bg-green-800 transition-colors flex items-center justify-center gap-2 group-hover:bg-green-700 hover:bg-green-700 group-hover:text-white group-hover:border-green-700">
                                                View Full Profile
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Top Governors */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-500">
                                                <Trophy className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Top Performing Officials</h2>
                                        </div>

                                        <div className="space-y-6">
                                            {topGovernors.map((gov) => (
                                                <div key={gov.rank} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${gov.rank === 1 ? "bg-yellow-500" : gov.rank === 2 ? "bg-zinc-400" : "bg-orange-600"}`}>
                                                        {gov.rank}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-zinc-900 dark:text-white">{gov.name}</h3>
                                                        <p className="text-sm text-zinc-500">{gov.state} State</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="block text-xl font-bold text-green-700 dark:text-green-400">{gov.score}%</span>
                                                        {gov.trend === "up" && <TrendingUp className="w-4 h-4 text-green-700 inline" />}
                                                        {gov.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500 inline" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* State Rankings */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-500">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">State Category Leaders</h2>
                                        </div>

                                        <div className="space-y-6">
                                            {statePerformance.map((item, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex justify-between text-sm font-medium">
                                                        <span className="text-zinc-700 dark:text-zinc-300">{item.state} - {item.category}</span>
                                                        <span className="text-zinc-900 dark:text-white">{item.score}/100</span>
                                                    </div>
                                                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.score}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.2 * index }}
                                                            className={`h-full rounded-full ${item.color}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Citizen Engagement */}
                                <div className="bg-linear-to-r from-green-700 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                                        <div>
                                            <h2 className="text-5xl max-w-lg font-bold mb-4">Top Citizen Contributors</h2>
                                            <p className="text-green-100 max-w-md">
                                                These citizens are driving change through active participation, proposal submissions, and community organizing.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-6">
                                            {engagementLeaders.map((leader, i) => (
                                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 min-w-[160px]">
                                                    <div className="w-12 h-12 mx-auto bg-white text-green-700 rounded-full flex items-center justify-center font-bold text-xl mb-3">
                                                        {leader.name.charAt(0)}
                                                    </div>
                                                    <h3 className="font-bold">{leader.name}</h3>
                                                    <p className="text-sm text-green-200 mb-2">{leader.badge}</p>
                                                    <div className="inline-flex items-center gap-1 bg-green-800/50 px-3 py-1 rounded-full text-xs">
                                                        <Medal className="w-3 h-3" />
                                                        {leader.contributions} pts
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
