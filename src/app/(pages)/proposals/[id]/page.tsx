
import { getProposal } from "@/actions/proposals";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Calendar, Tag, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";
import CommentSection from "@/components/CommentSection";
import VoteButton from "@/components/VoteButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Validate UUID format before fetching to prevent invalid input syntax for type uuid error
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        notFound();
    }

    const proposal = await getProposal(id);

    if (!proposal) {
        notFound();
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/proposals" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-green-700 transition-colors">
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
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-10">
                    <p className="tex-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 mb-6">
                        {proposal.summary}
                    </p>

                    {proposal.content && (
                        <div
                            className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-a:text-green-700"
                            dangerouslySetInnerHTML={{ __html: proposal.content }} // If content handles rich text
                        />
                    )}

                    {!proposal.content && proposal.description && (
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                            {proposal.description}
                        </p>
                    )}

                    <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2">
                        {proposal.tags?.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1">
                                <Tag className="w-3 h-3" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Comments Section */}
                <CommentSection
                    proposalId={proposal.id}
                    comments={proposal.comments}
                    currentUser={user}
                />
            </main>
        </div>
    );
}
