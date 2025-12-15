"use client";

import { deleteSolution } from "@/actions/admin";
import { Edit, Plus, Trash2, Lightbulb, Zap, School, HeartPulse, Shield, Leaf, BarChart3, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useState } from "react";

type TabType = "All" | "Proposed" | "In Progress" | "Active";

export default function SolutionsList({ solutions }: { solutions: any[] }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSolutions = solutions.filter(item => {
        const matchesTab = activeTab === "All" || item.status === activeTab.toLowerCase();
        const matchesSearch =
            (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.sector || "").toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    // Calculate Stats
    const stats = {
        total: solutions.length,
        proposed: solutions.filter(s => s?.status === "proposed").length,
        inProgress: solutions.filter(s => s?.status === "in progress").length,
        active: solutions.filter(s => s?.status === "active").length,
    };

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this solution?")) return;
        try {
            await deleteSolution(id);
            toast.success("Solution deleted");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Error deleting solution");
        }
    }

    const getCategoryIcon = (sector: string | null | undefined) => {
        if (!sector) return <Lightbulb className="w-4 h-4" />;

        switch (sector.toLowerCase()) {
            case 'infrastructure': return <Zap className="w-4 h-4" />;
            case 'health': return <HeartPulse className="w-4 h-4" />;
            case 'education': return <School className="w-4 h-4" />;
            case 'environment': return <Leaf className="w-4 h-4" />;
            case 'security': return <Shield className="w-4 h-4" />;
            case 'economy': return <BarChart3 className="w-4 h-4" />;
            default: return <Lightbulb className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string | null | undefined) => {
        if (!status) return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';

        switch (status) {
            case 'Proposed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'Implemented': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            default: return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
        }
    };

    return (
        <div className="w-full mx-auto space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Solutions</h1>
                    <p className="text-zinc-500 mt-2 text-lg">Manage and track community development projects.</p>
                </div>
                <Link
                    href="/admin/solutions/create"
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-zinc-500/10 hover:scale-105 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    New Project
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-50 dark:bg-black/20 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-2 scrollbar-none">
                    {(["All", "Proposed", "In Progress", "Active"] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                activeTab === tab
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-72 pr-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-200 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSolutions.map((item) => (
                    <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col transition-all hover:shadow-xl hover:shadow-zinc-500/5 hover:border-zinc-300 dark:hover:border-zinc-700">
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                    {getCategoryIcon(item.sector)}
                                    {item.sector || "Uncategorized"}
                                </span>
                                <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", getStatusColor(item.type))}>
                                    {item.type || "Unknown"}
                                </div>
                            </div>

                            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                {item.name || "Untitled Project"}
                            </h3>

                            <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 mb-6 flex-1">
                                {item.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                                <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                                    Last updated {new Date(item.created_at || Date.now()).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200">
                                    <Link
                                        href={`/admin/solutions/${item.id}/edit`}
                                        className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Status Progress Bar Visual */}
                        {item.status === "In Progress" && (
                            <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800">
                                <div className="h-full bg-yellow-500 w-1/2 animate-pulse" />
                            </div>
                        )}
                        {item.status === "Implemented" && (
                            <div className="h-1.5 w-full bg-green-500" />
                        )}
                        {item.status === "Proposed" && (
                            <div className="h-1.5 w-full bg-blue-500" />
                        )}
                    </div>
                ))}

                {filteredSolutions.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                            <Search className="w-10 h-10 text-zinc-300" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No projects found</h3>
                        <p className="text-zinc-500 mb-8 font-medium max-w-sm text-center">
                            {searchQuery ? "We couldn't find any projects matching your search." : "Get started by creating your first community solution."}
                        </p>
                        {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="px-6 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        ) : (
                            <Link
                                href="/admin/solutions/create"
                                className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Create Project
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
