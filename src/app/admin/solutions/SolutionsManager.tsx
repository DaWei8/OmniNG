"use client";

import { createSolution, deleteSolution } from "@/actions/admin";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SolutionsManager({ solutions }: { solutions: any[] }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            await createSolution(formData);
            toast.success("Solution added successfully!");
        } catch (error: any) {
            toast.error(error.message || "Error adding solution");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this solution?")) return;
        try {
            await deleteSolution(id);
            toast.success("Solution deleted");
        } catch (error: any) {
            toast.error(error.message || "Error deleting solution");
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Add Solutions</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Propose official solutions to community problems.</p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm mb-12">
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g. Solar Street Light Installation Phase 1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            >
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="Environment">Environment</option>
                                <option value="Security">Security</option>
                                <option value="Economy">Economy</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Initial Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            >
                                <option value="Proposed">Proposed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Implemented">Implemented</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            Description / Plan
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={6}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Detail the execution plan..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Create Solution"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Existing Solutions</h2>
                {solutions.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-full">{item.status}</span>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">{item.category}</p>
                            <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {solutions.length === 0 && <p className="text-zinc-500 text-center py-10">No solutions found.</p>}
            </div>
        </div>
    );
}
