"use client";

import { Edit, Plus, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import DeleteNewsButton from "./DeleteNewsButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewsForm from "./NewsForm";
import SearchInput from "@/components/admin/SearchInput";

export default function NewsList({ news }: { news: any[] }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Manage News</h1>
                    <p className="text-zinc-500">View, edit, and create official news.</p>
                </div>
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-zinc-500/10 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create Article
                </button>
            </div>

            <div className="w-full max-w-md">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search news..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNews.map((item) => (
                    <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col transition-all hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700">
                        {/* Status Strip */}
                        <div className="h-2 w-full bg-blue-500" />

                        <div className="p-5 flex flex-col h-full">
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                                <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(item.created_at).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                    {item.category}
                                </span>
                                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md font-medium">
                                    Published
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1">
                                {item.summary}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                                <Link
                                    href={`/news/${encodeURIComponent(item.title)}`}
                                    target="_blank"
                                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
                                >
                                    <FileText className="w-3 h-3" />
                                    View Live
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/news/${item.id}/edit`}
                                        className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <DeleteNewsButton newsId={item.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredNews.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                            {searchQuery ? "No matching news found" : "No news articles found"}
                        </h3>
                        <p className="text-zinc-500 mb-6">
                            {searchQuery ? "Try adjusting your search terms." : "Get started by creating your first official news update."}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setIsCreateOpen(true)}
                                className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity"
                            >
                                Create Article
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10">
                            <h2 className="text-xl font-bold">Create New Article</h2>
                            <button onClick={() => setIsCreateOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white p-2">
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <NewsForm
                                onSuccess={() => {
                                    setIsCreateOpen(false);
                                    router.refresh();
                                }}
                                onCancel={() => setIsCreateOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
