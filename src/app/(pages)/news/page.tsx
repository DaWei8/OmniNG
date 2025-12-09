"use client";

import { useState } from 'react';
import { newsData, NewsCategory } from '@/data/newsData';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, Globe, Shield, TrendingUp, Landmark, Zap, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export const categories: (NewsCategory | 'All')[] = [
    'All',
    'Economic',
    'Political',
    'Geopolitical',
    'Financial',
    'Technology',
    'Security',
    'Religious',
    'Sports',
    'Entertainment'
];

export const categoryColors: Record<NewsCategory, string> = {
    'Economic': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Political': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    'Geopolitical': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'Financial': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    'Technology': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Security': 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100',
    'Religious': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    'Sports': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'Entertainment': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
};

export const categoryIcons: Record<NewsCategory, any> = {
    'Economic': TrendingUp,
    'Political': Landmark,
    'Geopolitical': Globe,
    'Financial': TrendingUp, // optimize
    'Technology': Zap,
    'Security': Shield,
    'Religious': BookOpen,
    'Sports': Zap,
    'Entertainment': Zap,
};

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState<NewsCategory | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNews = newsData.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-20 pb-14 px-4 overflow-hidden">

                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        <span className="text-green-500">What's </span>Happening In <span className="text-green-500">Nigeria</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        Stay informed with the latest updates across economics, politics, security, and technology.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl relative">
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all shadow-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                    </div>

                    <div className="my-4 overflow-x-auto py-0.5 scrollbar-hide">
                        <div className="flex gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300",
                                        activeCategory === category
                                            ? "bg-green-700 dark:bg-white text-white dark:text-black shadow-lg scale-105"
                                            : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl xl:max-w-7xl pt-6 px-5 mx-auto relative ">
                {/* News Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <AnimatePresence>
                        {filteredNews.map((item) => {
                            const Icon = categoryIcons[item.category] || BookOpen;
                            return (
                                <Link href={`/news/${item.id}`} key={item.id} className="block h-full">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300 cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={clsx(
                                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                categoryColors[item.category]
                                            )}>
                                                {item.category}
                                            </span>
                                            <div className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform">
                                                <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:text-green-700 dark:group-hover:text-green-700 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 grow">
                                            {item.summary}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                {item.readTime || '3 min read'}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
                {filteredNews.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 text-lg">No news found matching your criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
