"use client";

import { Check, AlertTriangle, Eye, Edit, Plus, Trash2, Filter } from "lucide-react";
import Link from "next/link";
import DeleteProposalButton from "./DeleteProposalButton";
import ApproveProposalButton from "./ApproveProposalButton";
import { useState } from "react";
import clsx from "clsx";
import SearchInput from "@/components/admin/SearchInput";

type TabType = "All" | "Proposed" | "Approved" | "Removed";

export default function ProposalsList({ proposals }: { proposals: any[] }) {
    const [activeTab, setActiveTab] = useState<TabType>("Proposed");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProposals = proposals.filter(p => {
        const matchesTab = activeTab === "All" || p.status === activeTab;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.profiles?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Moderate Proposals</h1>
                    <p className="text-zinc-500">Review, approve, or remove citizen proposals.</p>
                </div>
                <Link
                    href="/admin/proposals/create"
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-zinc-500/10"
                >
                    <Plus className="w-4 h-4" />
                    New Proposal
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
                    {(["Proposed", "Approved", "Removed", "All"] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                activeTab === tab
                                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-md"
                                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            )}
                        >
                            {tab === "Proposed" ? "Pending" : tab}
                            <span className={clsx(
                                "ml-2 text-xs py-0.5 px-1.5 rounded-full",
                                activeTab === tab
                                    ? "bg-white/20 text-white dark:text-black"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                            )}>
                                {tab === "All" ? proposals.length : proposals.filter(p => p.status === tab).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-72">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search proposals..."
                    />
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal: any) => (
                        <div
                            key={proposal.id}
                            className={clsx(
                                "group bg-white dark:bg-zinc-900 p-5 rounded-2xl border transition-all hover:shadow-lg",
                                proposal.status === "Removed" ? "border-red-200 dark:border-red-900/30 opacity-75" :
                                    proposal.status === "Approved" ? "border-green-200 dark:border-green-900/30" :
                                        "border-zinc-200 dark:border-zinc-800"
                            )}
                        >
                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider", {
                                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400": proposal.status === "Proposed",
                                            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": proposal.status === "Approved",
                                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": proposal.status === "Removed",
                                        })}>
                                            {proposal.status === "Proposed" ? "Pending Review" : proposal.status}
                                        </span>
                                        <span className="text-xs text-zinc-400">•</span>
                                        <span className="text-xs text-zinc-500 font-medium">{new Date(proposal.created_at).toLocaleDateString()}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                                        {proposal.title}
                                    </h3>

                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 md:line-clamp-1 mb-3">
                                        {proposal.summary}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <span>Submitted by <strong>{proposal.profiles?.full_name || "Anonymous"}</strong></span>
                                    </div>

                                    {proposal.is_deleted && (
                                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start gap-2">
                                            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-bold">Moderation Note:</span> {proposal.deletion_reason}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex md:flex-col items-center md:items-end gap-2 md:pl-4 md:border-l border-zinc-100 dark:border-zinc-800 shrink-0">
                                    <div className="flex gap-2">
                                        {proposal.status !== "Approved" && proposal.status !== "Removed" && (
                                            <ApproveProposalButton proposalId={proposal.id} />
                                        )}

                                        <Link
                                            href={`/admin/proposals/${proposal.id}/edit`}
                                            className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>

                                        {proposal.status !== "Removed" && (
                                            <DeleteProposalButton proposalId={proposal.id} />
                                        )}
                                    </div>

                                    <a
                                        href={`/proposals/${proposal.id}`}
                                        target="_blank"
                                        className="hidden md:flex text-xs font-medium text-zinc-400 hover:text-green-600 items-center gap-1 mt-auto transition-colors"
                                    >
                                        View Live Page <Eye className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                            {/* Mobile only view link */}
                            <a
                                href={`/proposals/${proposal.id}`}
                                target="_blank"
                                className="md:hidden mt-4 w-full flex items-center justify-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400"
                            >
                                <Eye className="w-4 h-4" /> View Live Page
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <Filter className="w-10 h-10 text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">No proposals found</h3>
                        <p className="text-zinc-500 mb-6 font-medium">
                            {searchQuery
                                ? "No proposals found matching your search."
                                : `There are no ${activeTab === "All" ? "" : activeTab.toLowerCase()} proposals to display.`}
                        </p>
                        {(activeTab !== "All" || searchQuery) && (
                            <button
                                onClick={() => { setActiveTab("All"); setSearchQuery(""); }}
                                className="text-green-600 font-bold hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
