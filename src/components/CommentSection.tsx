"use client";

import { useState } from "react";
import { addComment } from "@/actions/proposals";
import { ShieldCheck, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CommentSection({ proposalId, comments, currentUser }: { proposalId: string, comments: any[], currentUser: any }) {
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setIsSubmitting(true);
        try {
            await addComment(proposalId, commentText);
            setCommentText("");
            router.refresh(); // Refresh server components to see new comment
        } catch (error) {
            console.error(error);
            alert("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Comments <span className="text-zinc-400 text-lg font-normal">({comments.length})</span>
            </h3>

            {/* Comment Form */}
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-6 mb-8">
                {currentUser ? (
                    <form onSubmit={handleCommentSubmit}>
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white font-bold shrink-0">
                                {currentUser.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-1">
                                <span className="text-sm font-bold block text-zinc-900 dark:text-white">You</span>
                            </div>
                        </div>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Share your thoughts constructively..."
                            className="w-full bg-white dark:bg-zinc-900 border-0 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-green-700 mb-3 resize-y"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!commentText.trim() || isSubmitting}
                                className="px-6 py-2 bg-green-700 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
                            >
                                {isSubmitting ? "Posting..." : "Post Comment"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-zinc-500 mb-4">Only registered users can post comments.</p>
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
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 shrink-0 overflow-hidden">
                            {comment.avatar ? (
                                <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                            ) : (
                                comment.author?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-zinc-900 dark:text-white">{comment.author}</span>
                                <span className="text-xs text-zinc-500">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
