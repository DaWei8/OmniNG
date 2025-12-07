"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { newsData, NewsCategory } from '@/data/newsData';
import { Calendar, Clock, ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const newsItem = newsData.find((n) => n.id === id);

    if (!newsItem) {
        notFound();
    }

    const relatedNews = newsData
        .filter((n) => n.category === newsItem.category && n.id !== newsItem.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/news" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>
                    <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 py-10">
                {/* Header Section */}
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                            {newsItem.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        {newsItem.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 border-y border-zinc-100 dark:border-zinc-800 py-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {newsItem.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {newsItem.readTime || '5 min read'}
                        </div>
                        <div className="font-medium text-green-600 dark:text-green-500">
                            By {newsItem.author || 'Editorial Staff'}
                        </div>
                        <div className="italic">
                            Source: {newsItem.source}
                        </div>
                    </div>
                </header>

                {/* Main Image (Placeholder if none) */}
                <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-12 shadow-sm">
                    {newsItem.imageUrl ? (
                        <Image
                            src={newsItem.imageUrl}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                            <div className="text-center">
                                <span className="text-6xl font-black opacity-20 block mb-2">{newsItem.category.charAt(0)}</span>
                                <span className="text-sm font-medium opacity-50">No Image Available</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none mb-16">
                    <p className="lead text-xl text-zinc-600 dark:text-zinc-300 font-medium">
                        {newsItem.summary}
                    </p>
                    <hr className="my-8 border-zinc-100 dark:border-zinc-800" />

                    {newsItem.content ? (
                        <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    ) : (
                        // Mock Body Content generator if empty
                        <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Impact on the Region</h3>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                            </p>
                            <blockquote className="border-l-4 border-green-500 pl-4 italic my-8 text-zinc-600 dark:text-zinc-400">
                                "This development marks a significant turning point for the sector, promising renewed growth and stability for the coming fiscal year."
                            </blockquote>
                            <p>
                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                        </div>
                    )}
                </div>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <Tag className="w-6 h-6 text-green-600" />
                            Related in {newsItem.category}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedNews.map((related) => (
                                <Link href={`/news/${related.id}`} key={related.id} className="group cursor-pointer">
                                    <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-4 overflow-hidden">
                                        {/* Thumbnail Placeholder */}
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 group-hover:scale-105 transition-transform duration-500">
                                            <span className="text-zinc-300 dark:text-zinc-700 font-bold text-3xl opacity-20">
                                                {related.category.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {related.summary}
                                    </p>
                                    <div className="mt-3 flex items-center text-xs text-zinc-400 font-medium group-hover:text-green-600 transition-colors">
                                        Read More <ChevronRight className="w-3 h-3 ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
