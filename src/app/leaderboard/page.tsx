"use client";

import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Medal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const topGovernors = [
    { rank: 1, name: "Babajide Sanwo-Olu", state: "Lagos", score: 92, trend: "up" },
    { rank: 2, name: "Abba Kabir Yusuf", state: "Kano", score: 88, trend: "up" },
    { rank: 3, name: "Prof. Chukwuma Soludo", state: "Anambra", score: 85, trend: "stable" },
];

const statePerformance = [
    { state: "Lagos", category: "Economy", score: 95, color: "bg-green-500" },
    { state: "Rivers", category: "Infrastructure", score: 88, color: "bg-blue-500" },
    { state: "Edo", category: "Digital Innovation", score: 82, color: "bg-purple-500" },
    { state: "Borno", category: "Resilience", score: 78, color: "bg-orange-500" },
];

const engagementLeaders = [
    { name: "Chinedu Okeke", contributions: 154, badge: "Community Voice" },
    { name: "Amina Yusuf", contributions: 132, badge: "Policy Expert" },
    { name: "Tunde Bakare", contributions: 98, badge: "Activist" },
];

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                        Performance Leaderboard
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                        Recognizing excellence and accountability. See who is leading the charge in governance and community impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Top Governors */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-500">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Top Performing Officials</h2>
                        </div>

                        <div className="space-y-6">
                            {topGovernors.map((gov) => (
                                <div key={gov.rank} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${gov.rank === 1 ? "bg-yellow-500" : gov.rank === 2 ? "bg-zinc-400" : "bg-orange-600"
                                        }`}>
                                        {gov.rank}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">{gov.name}</h3>
                                        <p className="text-sm text-zinc-500">{gov.state} State</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-green-600 dark:text-green-400">{gov.score}%</span>
                                        {gov.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500 inline" />}
                                        {gov.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500 inline" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* State Rankings */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl"
                    >
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
                                            animate={{ width: `${item.score}%` }}
                                            transition={{ duration: 1, delay: 0.2 * index }}
                                            className={`h-full rounded-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Citizen Engagement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-linear-to-r from-green-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Top Citizen Contributors</h2>
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
                </motion.div>

            </div>
        </div>
    );
}
