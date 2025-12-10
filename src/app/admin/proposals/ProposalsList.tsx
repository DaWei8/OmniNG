"use client";

import { approveProposal } from "@/actions/admin";
import { Check, AlertTriangle, Eye, Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteProposalButton from "./DeleteProposalButton";

export default function ProposalsList({ proposals }: { proposals: any[] }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Moderate Proposals</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Review, approve, or remove citizen proposals.</p>
                </div>
                <Link
                    href="/admin/proposals/create"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Proposal
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proposals.map((proposal: any) => (
                    <div
                        key={proposal.id}
                        className={`bg-white flex flex-col h-64 dark:bg-zinc-800 p-6 rounded-xl border ${proposal.status === "Removed" ? "border-red-200 dark:border-red-900/50 opacity-75" :
                            proposal.status === "Approved" ? "border-green-200 dark:border-green-900/50" :
                                "border-zinc-200 dark:border-zinc-700"
                            } shadow-sm transition-shadow hover:shadow-md`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                                    {proposal.title}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    by {proposal.profiles?.full_name || "Unknown"} • {new Date(proposal.created_at).toLocaleDateString()} •
                                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${proposal.status === "Approved" ? "bg-green-100 text-green-700" :
                                        proposal.status === "Removed" ? "bg-red-100 text-red-700" :
                                            "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {proposal.status}
                                    </span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {proposal.status !== "Approved" && proposal.status !== "Removed" && (
                                    <button
                                        onClick={async () => {
                                            if (confirm("Approve this proposal?")) {
                                                await approveProposal(proposal.id);
                                            }
                                        }}
                                        title="Approve"
                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
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
                        </div>

                        <div className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-3">
                            {proposal.summary}
                        </div>

                        {proposal.is_deleted && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold">Moderation Note:</span> {proposal.deletion_reason}
                                </div>
                            </div>
                        )}

                        <a href={`/proposals/${proposal.id}`} target="_blank" className="text-sm text-zinc-500 mt-auto hover:text-zinc-900 dark:hover:text-white flex items-center gap-1">
                            <Eye className="w-4 h-4" /> View Full Proposal
                        </a>
                    </div>
                ))}

                {proposals.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                        <p className="text-zinc-500 mb-4">No proposals found.</p>
                        <Link
                            href="/admin/proposals/create"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Create first proposal
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
