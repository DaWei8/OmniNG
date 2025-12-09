
import { getProposals } from "@/actions/proposals";
import ProposalList from "@/components/ProposalList";
import ProposalFilters from "@/components/ProposalFilters";

export const dynamic = 'force-dynamic'; // Since we are using searchParams and database

export default async function ProposalsPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
    const { q, category } = await searchParams;
    const proposals = await getProposals(category || "All", q || "");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* Hero Header */}
            <div className="relative bg-zinc-950 px-4 pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Citizen <span className="text-green-500">Proposals</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-6">
                        Submit ideas, voice your opinion, and vote on policies that shape our future.
                        Your voice matters.
                    </p>
                    <ProposalFilters />
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-12">
                <ProposalList proposals={proposals} />
            </main>
        </div>
    );
}
