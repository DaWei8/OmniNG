
import { getProposal } from "@/actions/proposals";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Calendar, Tag, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";
import CommentSection from "@/components/CommentSection";
import VoteButton from "@/components/VoteButton";
import { createClient } from "@/utils/supabase/server";
import ShareButton from "@/components/ShareButton";

export const dynamic = 'force-dynamic';

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        notFound();
    }

    const proposal = await getProposal(id);

    if (!proposal) {
        notFound();
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    // Check for admin role
    const { data: profile } = user ? await supabase.from("profiles").select("role").eq("id", user.id).single() : { data: null };
    const isAdmin = profile?.role === 'admin';

    return (
        <div className="min-h-screen relative bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/proposals" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-green-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Proposals
                    </Link>
                    <ShareButton title={proposal.title} className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                    </ShareButton>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1",
                            proposal.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                            proposal.status === "Under Review" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                            proposal.status === "Approved" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                            proposal.status === "Removed" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                        )}>
                            {proposal.status === "Proposed" && <AlertCircle className="w-3 h-3" />}
                            {proposal.status === "Under Review" && <Clock className="w-3 h-3" />}
                            {proposal.status === "Approved" && <CheckCircle className="w-3 h-3" />}
                            {proposal.status === "Removed" && <XCircle className="w-3 h-3" />}
                            {proposal.status}
                        </span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-green-700 dark:text-green-400 font-medium">{proposal.category}</span>
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
                                    <Calendar className="w-3 h-3" /> {new Date(proposal.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <VoteButton
                                proposalId={proposal.id}
                                initialCount={proposal.upvotes}
                                initialHasVoted={proposal.hasVoted}
                                currentUser={user}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Section */}
                        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                                Executive Summary
                            </h2>
                            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                {proposal.summary}
                            </p>
                        </section>

                        {/* Problem Solution Section */}
                        {proposal.problem_solution && (
                            <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                                    How it Solves the Problem
                                </h2>
                                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                    {proposal.problem_solution}
                                </p>
                            </section>
                        )}

                        {/* Proposal Details Content */}
                        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                                Full Proposal Details
                            </h2>

                            {proposal.content ? (
                                <div
                                    className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-a:text-green-700"
                                    dangerouslySetInnerHTML={{ __html: proposal.content }}
                                />
                            ) : (
                                <p className="text-zinc-500 italic">No additional details provided.</p>
                            )}
                        </section>
                    </div>

                    <div className="space-y-6">
                        {/* Meta Sidebar */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-36">
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Proposal Metadata</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Status</label>
                                    <div className="inline-flex">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2",
                                            proposal.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                            proposal.status === "Under Review" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                            proposal.status === "Approved" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                            proposal.status === "Removed" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                        )}>
                                            {proposal.status}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Category</label>
                                    <span className="font-medium text-zinc-900 dark:text-white">{proposal.category}</span>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Posted Date</label>
                                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(proposal.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                    </div>
                                </div>

                                {proposal.tags && proposal.tags.length > 0 && (
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {proposal.tags.map((tag: string) => (
                                                <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                {proposal.status !== "Removed" && !proposal.is_deleted ? (
                    <div className="max-w-4xl">
                        <CommentSection
                            proposalId={proposal.id}
                            comments={proposal.comments}
                            currentUser={user}
                            isAdmin={isAdmin}
                        />
                    </div>
                ) : (
                    <div className="bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 italic max-w-4xl">
                        Comments have been disabled for this proposal.
                    </div>
                )}
            </main>
        </div>
    );
}
