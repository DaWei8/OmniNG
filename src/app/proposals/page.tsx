"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Plus, ThumbsUp, MessageSquare, Filter, Tag } from 'lucide-react';
import { proposalsData } from '@/data/proposalsData';
import clsx from 'clsx';

export default function ProposalsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    const filteredProposals = proposalsData.filter(proposal =>
        (filterCategory === "All" || proposal.category === filterCategory) &&
        (proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const categories = ["All", "Infrastructure", "Education", "Health", "Economy", "Security", "Environment"];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* Hero Header */}
            <div className="relative bg-zinc-950 pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl mx-auto mb-5 relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Citizen Proposals
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8">
                        Submit ideas, voice your opinion, and vote on policies that shape our future.
                        Your voice matters.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search proposals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all shadow-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        </div>
                        <Link href="/proposals/submit" className="px-6 py-4 bg-green-700 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all">
                            <Plus className="w-5 h-5" />
                            <span>New Proposal</span>
                        </Link>
                    </div>
                </div>
                {/* Filters */}
                <div className="flex max-w-5xl xl:max-w-7xl mx-auto gap-2 overflow-x-auto pb-6 mb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border",
                                filterCategory === cat
                                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-12">
                {/* Proposals List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredProposals.map((proposal) => (
                        <Link href={`/proposals/${proposal.id}`} key={proposal.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:border-green-700/50 hover:shadow-xl hover:shadow-green-700/10 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Stats Column (Mobile hidden or reordered) */}
                                    <div className="hidden md:flex flex-col items-center gap-4 min-w-[80px] pt-2">
                                        <div className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400 group-hover:text-green-700 transition-colors">
                                            <ThumbsUp className="w-6 h-6" />
                                            <span className="font-bold">{proposal.upvotes}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400">
                                            <MessageSquare className="w-6 h-6" />
                                            <span className="font-bold">{proposal.comments.length}</span>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={clsx(
                                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                proposal.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                                proposal.status === "Under Review" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                                proposal.status === "Adopted" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                                proposal.status === "Rejected" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                            )}>
                                                {proposal.status}
                                            </span>
                                            <span className="text-zinc-400 text-sm">• {proposal.category}</span>
                                            <span className="text-zinc-400 text-sm">• {proposal.date}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors">
                                            {proposal.title}
                                        </h2>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                                            {proposal.summary}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                                <span>Proposed by <span className="font-semibold text-zinc-900 dark:text-zinc-300">{proposal.author}</span></span>
                                            </div>
                                            {/* Mobile Stats */}
                                            <div className="md:hidden flex items-center gap-4 text-sm text-zinc-500">
                                                <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {proposal.upvotes}</span>
                                                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {proposal.comments.length} comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}

                    {filteredProposals.length === 0 && (
                        <div className="text-center py-20 text-zinc-500">
                            No proposals found matching your criteria.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
