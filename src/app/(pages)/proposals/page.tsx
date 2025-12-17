
import { getProposals } from "@/actions/proposals";
import ProposalList from "@/components/ProposalList";
import ProposalFilters from "@/components/ProposalFilters";
import { Clock, Mic, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProposalsPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
    const { q, category } = await searchParams;
    const proposals = await getProposals(category || "All", q || "");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pb-16">
            {/* Hero Header */}
            <div className="relative bg-zinc-950 px-4 pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Ideas and <span className="text-green-500">Proposals</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-6">
                        Submit ideas, voice your opinion, and vote on policies that shape our future.
                        Your voice matters.
                    </p>
                    <ProposalFilters />
                </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 max-w-5xl xl:max-w-7xl px-5 mx-auto gap-8 my-16">
                {/* Top 3 Proposals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Trending Proposals</h2>
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Top 3</span>
                    </div>
                    <div className="grid gap-4">
                        {[...proposals].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3).map((proposal, i) => (
                            proposal.status === "Removed" ? null : <ProposalCard key={proposal.id} proposal={proposal} />
                        ))}
                        {proposals.length === 0 && (
                            <div className="text-zinc-500 italic p-4">No proposals yet.</div>
                        )}
                    </div>
                </div>

                {/* Community & Discourse */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Community Pulse</h2>

                    {/* Upcoming Space */}
                    <div className="bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Upcoming X Space
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Weekly Meeting</h3>
                            <p className="text-zinc-500 text-sm mb-4">Join us for a live discussion on the latest community proposals.</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                <Clock className="w-4 h-4" />
                                <span>Friday, 6:00 PM EST</span>
                            </div>
                            <a
                                href="https://x.com/i/spaces"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 block text-center w-full py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
                            >
                                Set Reminder
                            </a>
                        </div>
                    </div>

                    {/* Past Space */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                        <div className="flex items-center gap-2 text-zinc-500 mb-4">
                            <Mic className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Past Discussion</span>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-sm text-zinc-500 mb-1">Topic Discussed</h4>
                            <p className="font-bold text-zinc-900 dark:text-white line-clamp-2">
                                {proposals.length > 0
                                    ? [...proposals].sort((a, b) => b.upvotes - a.upvotes)[0].title
                                    : "Community Guidelines & Future Roadmap"}
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                            <span>Recorded 2 days ago</span>
                            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1 transition-colors">
                                Listen Replay <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center max-w-5xl xl:max-w-7xl px-5 mx-auto justify-between mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">All Proposals</h2>
            </div>
            <ProposalList proposals={proposals} />
        </div>
    );
}


const ProposalCard = ({ proposal }: {
    proposal: {
        id: any;
        title: any;
        summary: any;
        category: any;
        status: any;
        date: string;
        author: any;
        upvotes: any;
        commentsCount: any;
        hasVoted: boolean;
    }
}) => {

    return (
        <div key={proposal.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex items-start gap-4 hover:border-green-500/50 transition-colors">
            <div className="flex-1">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{proposal.title}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{proposal.summary}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
                    <span className="text-green-600 dark:text-green-400">{proposal.upvotes} upvotes</span>
                    <span>•</span>
                    <span>{proposal.commentsCount} comments</span>
                    <span>•</span>
                    <span>{proposal.category}</span>
                </div>
            </div>
        </div>
    );
}