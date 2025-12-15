"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';
import { Calendar, Clock, BookOpen, TrendingUp, Landmark, Globe, Zap, Shield } from 'lucide-react';
import { NewsCategory } from '@/data/newsData';

// Duplicate or import? Importing from page might be fragile if page changes structure.
// I'll redefine them here to be safe and independent.
const categoryColors: Record<NewsCategory, string> = {
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

const categoryIcons: Record<NewsCategory, any> = {
    'Economic': TrendingUp,
    'Political': Landmark,
    'Geopolitical': Globe,
    'Financial': TrendingUp,
    'Technology': Zap,
    'Security': Shield,
    'Religious': BookOpen,
    'Sports': Zap,
    'Entertainment': Zap,
};

export default function RelatedNewsCard({ related }: { related: any }) {
    const Icon = categoryIcons[related.category as NewsCategory] || BookOpen;

    return (
        <Link href={`/news/${related.title.replace(/%/g, '#pcnt#')}`} className="block h-full">
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
                        categoryColors[related.category as NewsCategory]
                    )}>
                        {related.category}
                    </span>
                    <div className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:text-green-700 dark:group-hover:text-green-700 transition-colors">
                    {related.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 grow">
                    {related.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {related.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {related.readTime || '3 min read'}
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
