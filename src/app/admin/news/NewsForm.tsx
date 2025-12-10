"use client";

import { createNews, updateNews } from "@/actions/admin";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";

export default function NewsForm({ initialData }: { initialData?: any }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        summary: initialData?.summary || "",
        content: initialData?.content || ""
    });
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("summary", formData.summary);
        data.append("content", formData.content);

        try {
            if (initialData?.id) {
                await updateNews(initialData.id, data);
                alert("News updated successfully!");
            } else {
                await createNews(data);
                alert("News published successfully!");
            }
            router.push("/admin/news");
            router.refresh();
        } catch (error) {
            alert("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Headline</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. Governor Announces New Infrastructure Projects"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Summary</label>
                <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    placeholder="Brief overview..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Content</label>
                <RichEditor
                    content={formData.content}
                    onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : initialData ? "Update News" : "Publish News"}
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
