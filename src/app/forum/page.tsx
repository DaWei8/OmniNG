"use client";

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Share2, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const forumPosts = [
    {
        id: 1,
        author: "Chinedu Okeke",
        title: "Proposal for Solar-Powered Street Lights in Aba",
        category: "Infrastructure",
        content: "The current power situation in Aba is affecting businesses. I propose a community-funded solar street light project...",
        upvotes: 124,
        downvotes: 12,
        comments: 45,
        time: "2 hours ago"
    },
    {
        id: 2,
        author: "Amina Yusuf",
        title: "Education Reform: Digital Literacy in Primary Schools",
        category: "Education",
        content: "We need to introduce coding and digital literacy from primary 4. This will prepare our children for the future economy.",
        upvotes: 89,
        downvotes: 5,
        comments: 23,
        time: "5 hours ago"
    },
    {
        id: 3,
        author: "Tunde Bakare",
        title: "Waste Management Solution for Lagos Markets",
        category: "Environment",
        content: "Markets are piling up with waste. A recycling incentive program could solve this. Here is my detailed plan...",
        upvotes: 256,
        downvotes: 30,
        comments: 112,
        time: "1 day ago"
    }
];

export default function ForumPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                            Citizen's Forum
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Share ideas, discuss policies, and shape the future of Nigeria.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium flex items-center gap-2 shadow-lg shadow-green-600/20 transition-all hover:scale-105">
                        <Plus className="w-5 h-5" />
                        New Proposal
                    </button>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                    {["All", "Infrastructure", "Education", "Health", "Economy", "Security", "Environment"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? "bg-zinc-900 dark:bg-white text-white dark:text-black"
                                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {forumPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-green-500/30 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-white">{post.author}</h3>
                                        <p className="text-xs text-zinc-500">{post.time} • {post.category}</p>
                                    </div>
                                </div>
                                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white hover:text-green-600 cursor-pointer transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                                {post.content}
                            </p>

                            <div className="flex items-center gap-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full text-zinc-500 hover:text-green-600 transition-colors">
                                        <ThumbsUp className="w-5 h-5" />
                                    </button>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.upvotes}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-zinc-500 hover:text-red-600 transition-colors">
                                        <ThumbsDown className="w-5 h-5" />
                                    </button>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.downvotes}</span>
                                </div>
                                <div className="flex items-center gap-2 ml-auto">
                                    <MessageSquare className="w-5 h-5 text-zinc-400" />
                                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{post.comments} Comments</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
