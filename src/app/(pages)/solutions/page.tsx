"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lightbulb, Leaf, GraduationCap, HeartPulse, Truck, Wallet, Briefcase, Zap, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { Sector, Solution } from '@/data/solutionsData';
import PaginationControl from '@/components/PaginationControl';
import { useEffect } from 'react';
import { getSolutions } from '@/actions/solutions';

const sectors: (Sector | 'All')[] = [
    'All',
    'Fintech',
    'Agriculture',
    'Healthcare',
    'Education',
    'Clean Energy',
    'Civic Tech',
    'Logistics'
];

const sectorIcons: Record<Sector, React.ElementType> = {
    'Fintech': Wallet,
    'Agriculture': Leaf,
    'Healthcare': HeartPulse,
    'Education': GraduationCap,
    'Clean Energy': Zap,
    'Civic Tech': Lightbulb,
    'Logistics': Truck,
    'Infrastructure': Briefcase
};

export default function SolutionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSector, setActiveSector] = useState<Sector | 'All'>('All');

    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getSolutions(activeSector, searchQuery);
                if (mounted) {
                    setSolutions(data);
                }
            } catch (error) {
                console.error("Failed to fetch solutions:", error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, [activeSector, searchQuery]);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 30;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeSector, searchQuery]);

    const totalPages = Math.ceil(solutions.length / ITEMS_PER_PAGE);
    const paginatedSolutions = solutions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-20 pb-14 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Nigerian <span className="text-green-500">Solutions</span> Directory
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8">
                        Discover and support the businesses, NGOs, and innovators solving real problems across Nigeria.
                    </p>
                    {/* Search Bar */}
                    <div className="relative max-w-xl">
                        <input
                            type="text"
                            placeholder="Find a solution, NGO, or sector..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all shadow-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                    </div>
                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide sticky top-14 z-20 backdrop-blur py-4 -mx-4 px-4">
                        {sectors.map((sector) => {
                            return (
                                <button
                                    key={sector}
                                    onClick={() => setActiveSector(sector)}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer font-medium whitespace-nowrap transition-all",
                                        activeSector === sector
                                            ? "bg-white text-black shadow-lg"
                                            : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    {sector}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div >

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="w-12 h-12 border-4 border-zinc-200 border-t-green-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                                {paginatedSolutions.map((solution) => (
                                    <SolutionCard key={solution.id} solution={solution} />
                                ))}
                            </AnimatePresence>
                        </div>

                        <PaginationControl
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />

                        {solutions.length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-zinc-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No solutions found</h3>
                                <p className="text-zinc-500">Try adjusting your search filters.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div >
    );
}

function SolutionCard({ solution }: { solution: Solution }) {
    const SectorIcon = sectorIcons[solution.sector] || Briefcase;

    return solution && (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-green-600/50 hover:shadow-xl hover:shadow-green-600/10 transition-all flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={clsx(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold",
                    solution.type === 'NGO' ? "bg-orange-500" :
                        solution.type === 'Business' ? "bg-blue-600" : "bg-purple-600"
                )}>
                    {(solution.name || "?").charAt(0)}
                </div>
                <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <SectorIcon className="w-3.5 h-3.5" />
                    {solution.sector}
                </div>
            </div>

            <div className="mb-4">
                <Link href={`/solutions/${solution.id}`} className="block">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                        {solution.name || "Untitled Solution"}
                    </h3>
                </Link>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                    {solution.type} • {solution.location}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                    {solution.description}
                </p>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                {/* Problem */}
                <div className="bg-red-50 h-20 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20">
                    <span className="block text-xs font-bold text-red-600 dark:text-red-400 mb-1">PROBLEM SOLVING</span>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-tight">
                        {solution.problemSolved}
                    </p>
                </div>

                {/* Impact Pills */}
                {solution.impactMetrics && (
                    <div className="flex flex-wrap gap-2">
                        {solution.impactMetrics.map((metric, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-900/30">
                                {metric}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-3">
                    <Link
                        href={`/solutions/${solution.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                    >
                        Details
                    </Link>
                    <a
                        href={solution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold hover:bg-green-600 dark:hover:bg-green-500 hover:text-white dark:hover:text-white transition-all transform active:scale-95"
                    >
                        Visit <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
