"use client";

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { createProposal } from '@/actions/proposals';
import { useFormStatus } from 'react-dom';
import RichEditor from '@/components/RichEditor';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-green-700 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                </>
            ) : (
                <>
                    <Send className="w-5 h-5" />
                    Submit Proposal
                </>
            )}
        </button>
    );
}

export default function SubmitProposalPage() {
    const [state, formAction] = useActionState(createProposal, null);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Infrastructure");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="min-h-screen relative bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="sticky top-16 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/proposals" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-green-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Cancel
                    </Link>
                    <h1 className="font-bold text-lg">Create New Proposal</h1>
                    <div className="w-10" /> {/* Spacer */}
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {state?.error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 flex items-center gap-2">
                        <span>⚠️</span> {state.error}
                    </div>
                )}
                <form action={formAction} className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Proposal Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none transition-all"
                                    placeholder="e.g., National Solar Grid Integration"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Category</label>
                                <select
                                    name="category"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none transition-all appearance-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                                    name="summary"
                                    required
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none transition-all min-h-[100px] resize-none"
                                    placeholder="Briefly describe the objective..."
                                    maxLength={280}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Full Proposal Details</label>
                                <RichEditor
                                    content={content}
                                    onChange={(html) => setContent(html)}
                                />
                                <input type="hidden" name="content" value={content} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </main>
        </div>
    );
}
