"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubmitProposalPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        category: "Infrastructure",
        summary: "",
        content: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to API.
        // For now, we simulate a submission and redirect.
        alert("Proposal submitted successfully!");
        router.push('/proposals');
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/proposals" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </Link>
                    <h1 className="font-bold text-lg">New Proposal</h1>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Proposal Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="e.g., National Solar Grid Integration"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Category</label>
                                <select
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Infrastructure</option>
                                    <option>Education</option>
                                    <option>Health</option>
                                    <option>Economy</option>
                                    <option>Security</option>
                                    <option>Environment</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Executive Summary</label>
                                <p className="text-xs text-zinc-500 mb-2">A brief overview of your proposal (max 280 chars).</p>
                                <textarea
                                    required
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all min-h-[100px] resize-none"
                                    placeholder="Briefly describe the objective..."
                                    maxLength={280}
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Full Proposal Details</label>
                                <textarea
                                    required
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all min-h-[300px]"
                                    placeholder="Describe your proposal in detail. You can use Markdown formatting..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                        >
                            <Send className="w-5 h-5" />
                            Submit Proposal
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
