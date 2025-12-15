"use client";

import { deleteComment } from "@/actions/admin";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DeleteCommentButton({ commentId }: { commentId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        setLoading(true);
        try {
            await deleteComment(commentId);
            toast.success("Comment deleted");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete comment");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
            title="Delete comment"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
