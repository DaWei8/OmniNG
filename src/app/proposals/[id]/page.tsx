"use client";

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { proposalsData } from '@/data/proposalsData';
import {
    ArrowLeft, ThumbsUp, MessageSquare, Share2, Calendar, User, Tag,
    CheckCircle, Clock, XCircle, AlertCircle, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx'; // Assuming clsx is available

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProposalDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const proposalId = parseInt(id);
    const proposal = proposalsData.find((p) => p.id === proposalId);

    // Mock User State (Simulating a logged-in verified user for demo)
    const [isLoggedIn] = useState(true); // Toggle this to see non-logged in view
    const [isVerified] = useState(true); // Toggle for verified badge

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(proposal ? proposal.comments : []);

    if (!proposal) {
        notFound();
    }

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            author: "You (Demo User)",
            content: commentText,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            verified: isVerified
        };

        setComments([newComment, ...comments]);
        setCommentText("");
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/proposals" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Proposals
                    </Link>
                    <button className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1",
                            proposal.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                            proposal.status === "Under Review" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                            proposal.status === "Adopted" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                            proposal.status === "Rejected" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                        )}>
                            {proposal.status === "Proposed" && <AlertCircle className="w-3 h-3" />}
                            {proposal.status === "Under Review" && <Clock className="w-3 h-3" />}
                            {proposal.status === "Adopted" && <CheckCircle className="w-3 h-3" />}
                            {proposal.status === "Rejected" && <XCircle className="w-3 h-3" />}
                            {proposal.status}
                        </span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">{proposal.category}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-white leading-tight">
                        {proposal.title}
                    </h1>

                    <div className="flex items-center justify-between py-4 border-t border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold">
                                {proposal.author.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-sm">{proposal.author}</div>
                                <div className="text-xs text-zinc-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {proposal.date}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-green-100 dark:hover:bg-green-900/20 text-zinc-700 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-500 rounded-xl transition-all">
                                <ThumbsUp className="w-5 h-5" />
                                <span className="font-bold">{proposal.upvotes}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-10">
                    <div
                        className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-a:text-green-600"
                        dangerouslySetInnerHTML={{ __html: proposal.content }}
                    />

                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2">
                        {proposal.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1">
                                <Tag className="w-3 h-3" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        Comments <span className="text-zinc-400 text-lg font-normal">({comments.length})</span>
                    </h3>

                    {/* Comment Form */}
                    <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-6 mb-8">
                        {isLoggedIn ? (
                            <form onSubmit={handleCommentSubmit}>
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shrink-0">
                                        U
                                    </div>
                                    <div className="ml-1">
                                        <span className="text-sm font-bold block text-zinc-900 dark:text-white">You</span>
                                        {isVerified && (
                                            <span className="text-[10px] text-green-600 flex items-center gap-0.5">
                                                <ShieldCheck className="w-3 h-3" /> Verified Citizen
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Share your thoughts constructively..."
                                    className="w-full bg-white dark:bg-zinc-900 border-0 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-green-500 mb-3 resize-y"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!commentText.trim()}
                                        className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-zinc-500 mb-4">Only registered and verified users can post comments.</p>
                                <Link href="/login" className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
                                    Log in to Contribute
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 shrink-0">
                                    {comment.author.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-zinc-900 dark:text-white">{comment.author}</span>
                                        {comment.verified && (
                                            <ShieldCheck className="w-4 h-4 text-green-500" aria-label="Verified User" />
                                        )}
                                        <span className="text-xs text-zinc-500">• {comment.date}</span>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        {comment.content}
                                    </p>
                                    <button className="flex items-center gap-1.5 mt-2 text-xs font-medium text-zinc-500 hover:text-green-600 transition-colors">
                                        <ThumbsUp className="w-3 h-3" /> {comment.likes}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
