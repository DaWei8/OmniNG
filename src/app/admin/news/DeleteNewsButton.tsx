"use client";

import { deleteNews } from "@/actions/admin";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminModal from "@/components/admin/AdminModal";
import { useRouter } from "next/navigation";

export default function DeleteNewsButton({ newsId }: { newsId: string }) {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        setLoading(true);
        try {
            await deleteNews(newsId);
            toast.success("Article deleted");
            setIsPromptOpen(false);
            router.refresh();
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
                title="Delete"
                className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            <AdminModal
                isOpen={isPromptOpen}
                onClose={() => setIsPromptOpen(false)}
                title="Delete Article"
                footer={
                    <>
                        <button
                            onClick={() => setIsPromptOpen(false)}
                            className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Deleting..." : "Confirm Delete"}
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-bold">Irreversible Action</p>
                            <p>Are you sure you want to delete this news article? This action cannot be undone and the URL will no longer be accessible.</p>
                        </div>
                    </div>
                </div>
            </AdminModal>
        </>
    );
}
