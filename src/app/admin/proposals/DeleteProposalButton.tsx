"use client";

import { deleteProposal } from "@/actions/admin";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteProposalButton({ proposalId }: { proposalId: string }) {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!reason.trim()) {
            alert("Please provide a reason.");
            return;
        }

        setLoading(true);
        try {
            await deleteProposal(proposalId, reason);
            setIsPromptOpen(false);
        } catch (error) {
            alert("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    if (isPromptOpen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-sm">
                    <h3 className="font-bold text-lg mb-2">Remove Content</h3>
                    <p className="text-sm text-zinc-500 mb-4">
                        This will replace the content with a violation notice. This action cannot be easily undone.
                    </p>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason for deletion (e.g. Hate speech, Spam)..."
                        className="w-full border rounded-lg p-2 mb-4 dark:bg-black dark:border-zinc-700"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsPromptOpen(false)}
                            className="px-3 py-1 text-sm text-zinc-600 hover:text-zinc-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? "Removing..." : "Confirm Remove"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsPromptOpen(true)}
            title="Delete / Censor"
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    );
}
