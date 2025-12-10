"use client";

import { deleteNews } from "@/actions/admin";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewsList({ news }: { news: any[] }) {
    const router = useRouter();

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this news article?")) return;
        try {
            await deleteNews(id);
            router.refresh();
        } catch (error) {
            alert("Error: " + error);
        }
    }

    return (
        <div className="">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Manage News</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">View, edit, and create official news.</p>
                </div>
                <Link
                    href="/admin/news/create"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Article
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {news.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{item.author_id ? "Official" : "Draft"}</span>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">{item.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href={`/admin/news/${item.id}/edit`}
                                className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {news.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                        <p className="text-zinc-500 mb-4">No news articles found.</p>
                        <Link
                            href="/admin/news/create"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Create your first article
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
