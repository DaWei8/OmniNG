"use client";

import { createProposal } from "@/actions/proposals";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";

export default function ProposalForm({ initialData }: { initialData?: any }) {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(initialData?.content || "");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        formData.append("content", content); // Add rich text content
        try {
            if (initialData?.id) {
                // await updateProposal(initialData.id, formData);
                alert("Proposal update not implemented yet for admin.");
            } else {
                await createProposal(null, formData);
                alert("Proposal created successfully!");
            }
            router.push("/admin/proposals");
            router.refresh();
        } catch (error) {
            alert("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6 max-w-4xl">
            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    defaultValue={initialData?.title}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
                <select
                    name="category"
                    defaultValue={initialData?.category || "Infrastructure"}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                >
                    <option>Infrastructure</option>
                    <option>Policy</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Economy</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Summary</label>
                <textarea
                    name="summary"
                    defaultValue={initialData?.summary}
                    rows={3}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Detailed Content</label>
                <RichEditor content={content} onChange={setContent} />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : initialData ? "Update Proposal" : "Create Proposal"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
