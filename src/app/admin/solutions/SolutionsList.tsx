"use client";

import { deleteSolution } from "@/actions/admin";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function SolutionsList({ solutions }: { solutions: any[] }) {
    const router = useRouter();

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this solution?")) return;
        try {
            await deleteSolution(id);
            router.refresh();
        } catch (error) {
            alert("Error: " + error);
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Manage Solutions</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Propose and track official solutions.</p>
                </div>
                <Link
                    href="/admin/solutions/create"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Solution
                </Link>
            </div>

            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {solutions.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.category}</p>
                                </div>
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <div className={clsx(
                                    "px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1",
                                    item.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                    item.status === "In Progress" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                    item.status === "Implemented" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                )}>
                                    {item.status}
                                </div>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-medium">{item.category}</p>
                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                href={`/admin/solutions/${item.id}/edit`}
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
                {solutions.length === 0 && (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700">
                        <p className="text-zinc-500 mb-4">No solutions found.</p>
                        <Link
                            href="/admin/solutions/create"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Create your first solution
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
