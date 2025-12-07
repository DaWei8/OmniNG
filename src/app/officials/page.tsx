"use client";

import React, { useState } from 'react';
import { Search, Star, Filter, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for officials
const officials = [
    {
        id: 1,
        name: "Babajide Sanwo-Olu",
        role: "Governor",
        state: "Lagos",
        party: "APC",
        rating: 4.2,
        promises: { kept: 15, broken: 3, pending: 8 },
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Babajide_Sanwo-Olu.jpg/440px-Babajide_Sanwo-Olu.jpg" // Placeholder or use a generic avatar if this fails
    },
    {
        id: 2,
        name: "Nyesom Wike",
        role: "Minister (FCT)",
        state: "FCT",
        party: "PDP",
        rating: 3.8,
        promises: { kept: 10, broken: 5, pending: 12 },
        image: ""
    },
    {
        id: 3,
        name: "Siminalayi Fubara",
        role: "Governor",
        state: "Rivers",
        party: "PDP",
        rating: 4.0,
        promises: { kept: 8, broken: 1, pending: 20 },
        image: ""
    },
    {
        id: 4,
        name: "Abba Kabir Yusuf",
        role: "Governor",
        state: "Kano",
        party: "NNPP",
        rating: 4.5,
        promises: { kept: 12, broken: 2, pending: 10 },
        image: ""
    }
];

export default function OfficialsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredOfficials = officials.filter(official =>
        (filter === "All" || official.role === filter) &&
        (official.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            official.state.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                        Know Your Officials
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                        Track performance, rate officials, and monitor campaign promises. Transparency starts here.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {["All", "Governor", "Senator", "Minister"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setFilter(role)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === role
                                        ? "bg-green-600 text-white"
                                        : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Officials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOfficials.map((official) => (
                        <motion.div
                            key={official.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-shadow group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                        {/* Placeholder Avatar */}
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xl">
                                            {official.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white group-hover:text-green-600 transition-colors">
                                            {official.name}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{official.role} • {official.state}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300">
                                            {official.party}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-yellow-700 dark:text-yellow-500 text-sm">{official.rating}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <span className="block text-lg font-bold text-green-600 dark:text-green-400">{official.promises.kept}</span>
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

                            <button className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                                View Full Profile
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
