"use client";

import { createNews, updateNews } from "@/actions/admin";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/RichEditor";
import { toast } from "react-hot-toast";

export default function NewsForm({ initialData, onSuccess, onCancel }: { initialData?: any, onSuccess?: () => void, onCancel?: () => void }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: initialData?.category || "",
        summary: initialData?.summary || "",
        content: initialData?.content || "",
        author: initialData?.author || "",
        source: initialData?.source || "",
        read_time: initialData?.read_time || ""
    });
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("summary", formData.summary);
        data.append("content", formData.content);
        data.append("author", formData.author);
        data.append("source", formData.source);
        data.append("read_time", formData.read_time);

        try {
            if (initialData?.id) {
                await updateNews(initialData.id, data);
                toast.success("News updated successfully!");
            } else {
                await createNews(data);
                toast.success("News published successfully!");
            }

            if (onSuccess) {
                onSuccess();
            } else {
                router.push("/admin/news");
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to save news");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Headline</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="e.g. Governor Announces New Infrastructure Projects"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category</label>
                        <select
                            value={formData.category || "Economic"}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Economic">Economic</option>
                            <option value="Political">Political</option>
                            <option value="Geopolitical">Geopolitical</option>
                            <option value="Financial">Financial</option>
                            <option value="Technology">Technology</option>
                            <option value="Security">Security</option>
                            <option value="Religious">Religious</option>
                            <option value="Sports">Sports</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Read Time</label>
                        <select
                            value={formData.read_time || "3 minutes"}
                            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-green-500 outline-none"
                        >
                            <option value="">Select Read Time</option>
                            <option value="3">3 minutes</option>
                            <option value="5">5 minutes</option>
                            <option value="7">7 minutes</option>
                            <option value="10">10 minutes</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Author</label>
                        <input
                            type="text"
                            value={formData.author || "OmniNG"}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Source</label>
                        <input
                            type="text"
                            value={formData.source}
                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. The New York Times"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Summary</label>
                    <textarea
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        rows={2}
                        required
                        className="w-full px-4 py-2 rounded-lg border h-32 border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none resize-none"
                        placeholder="Brief overview..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Content</label>
                    <div className="min-h-[200px]">
                        <RichEditor
                            content={formData.content}
                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                    type="button"
                    onClick={onCancel || (() => router.back())}
                    className="px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-700 hover:bg-green-800 cursor-pointer text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : initialData ? "Update News" : "Publish News"}
                </button>
            </div>
        </form>
    );
}
