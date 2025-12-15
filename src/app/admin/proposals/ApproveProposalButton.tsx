"use client";

import { approveProposal } from "@/actions/admin";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminModal from "@/components/admin/AdminModal";
import clsx from "clsx";

export default function ApproveProposalButton({ proposalId, className }: { proposalId: string, className?: string }) {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleApprove() {
        setLoading(true);
        try {
            await approveProposal(proposalId);
            toast.success("Proposal approved successfully");
            setIsPromptOpen(false);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsPromptOpen(true)}
                title="Approve"
                className={clsx("p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors", className)}
            >
                <Check className="w-5 h-5" />
            </button>

            <AdminModal
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                title="Approve Proposal"
                footer={
                    <>
                        <button
                            onClick={() => setIsPromptOpen(false)}
                            className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApprove}
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Approving..." : "Confirm Approval"}
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Ready to Approve?</h3>
                        <p className="text-zinc-500 text-sm max-w-sm">
                            This action will publish the proposal to the live site. Ensure the content adheres to all community guidelines.
                        </p>
                    </div>
                </div>
            </AdminModal>
        </>
    );
}
