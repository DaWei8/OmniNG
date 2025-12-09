"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

const categories = ["All", "Infrastructure", "Education", "Health", "Economy", "Security", "Environment"];

export default function ProposalFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const filterCategory = searchParams.get("category") || "All";

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("q", searchTerm);
            } else {
                params.delete("q");
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, router, searchParams]);

    const handleCategoryChange = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (cat === "All") {
            params.delete("category");
        } else {
            params.set("category", cat);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="mb-0">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search proposals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all shadow-lg"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                </div>
                <Link href="/proposals/submit" className="px-6 py-4 bg-green-700 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all">
                    <Plus className="w-5 h-5" />
                    <span>New Proposal</span>
                </Link>
            </div>
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide sticky top-14 z-20 backdrop-blur py-4 -mx-4 px-4 mt-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer font-medium whitespace-nowrap transition-all",
                            filterCategory === cat
                                ? "bg-white text-black shadow-lg"
                                : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
