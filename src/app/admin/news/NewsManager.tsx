"use client";

import { createNews, deleteNews, updateNews } from "@/actions/admin";
import { useState } from "react";
import { Loader2, Trash2, Edit } from "lucide-react";
import RichEditor from "@/components/RichEditor";

export default function AdminNewsPage({ news }: { news: any[] }) {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: "", summary: "", content: "" });

    function resetForm() {
        setFormData({ title: "", summary: "", content: "" });
        setIsEditing(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("summary", formData.summary);
        data.append("content", formData.content);

        try {
            if (isEditing) {
                await updateNews(isEditing, data);
                alert("News updated successfully!");
            } else {
                await createNews(data);
                alert("News published successfully!");
            }
            resetForm();
        } catch (error) {
            alert("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this news article?")) return;
        try {
            await deleteNews(id);
        } catch (error) {
            alert("Error: " + error);
        }
    }

    function startEdit(article: any) {
        setIsEditing(article.id);
        setFormData({
            title: article.title,
            summary: article.summary,
            content: article.content
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Manage News</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Create, update, and manage official news updates.</p>
            </div>

            {/* Form Section */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{isEditing ? "Edit News" : "Create New Article"}</h2>
                    {isEditing && (
                        <button onClick={resetForm} className="text-sm text-zinc-500 hover:text-zinc-900">
                            Cancel Edit
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? "Update News" : "Publish News"}
                    </button>
                </form>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Existing News</h2>
                {news.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-start gap-4">
                        <div>
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-zinc-500 mb-2">{new Date(item.created_at).toLocaleDateString()}</p>
                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.summary}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                            <button
                                onClick={() => startEdit(item)}
                                className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {news.length === 0 && <p className="text-zinc-500 text-center py-10">No news articles found.</p>}
            </div>
        </div>
    );
}
