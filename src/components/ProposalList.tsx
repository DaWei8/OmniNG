"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import PaginationControl from "@/components/PaginationControl";

export default function ProposalList({ proposals }: { proposals: any[] }) {
    if (proposals.length === 0) {
        return (
            <div className="text-center py-20 text-zinc-500">
                No proposals found matching your criteria.
            </div>
        )
    }

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 30;

    useEffect(() => {
        setCurrentPage(1);
    }, [proposals]);

    const totalPages = Math.ceil(proposals.length / ITEMS_PER_PAGE);
    const paginatedProposals = proposals.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProposals.map((proposal, i) => (
                    <Link href={`/proposals/${proposal.id}`} key={proposal.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white dark:bg-zinc-900 rounded-3xl px-6 pt-10 pb-6 border border-zinc-200 dark:border-zinc-800 hover:border-green-700/50 hover:shadow-xl hover:shadow-green-700/10 transition-all group h-full flex flex-col"
                        >
                            <div className="flex flex-col gap-6 flex-1">
                                {/* Content Column */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={clsx(
                                            "px-3 text-nowrap py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                            proposal.status === "Proposed" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                            proposal.status === "Under Review" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                            proposal.status === "Adopted" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                                            proposal.status === "Rejected" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                                        )}>
                                            {proposal.status}
                                        </span>
                                        <span className="text-zinc-400 text-nowrap text-sm">• {proposal.category}</span>
                                        <span className="text-zinc-400 text-nowrap text-sm">• {proposal.date}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors">
                                        {proposal.title}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                                        {proposal.summary}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                                            <span>Proposed by <span className="font-semibold text-zinc-900 dark:text-zinc-300">{proposal.author}</span></span>
                                        </div>
                                        {/* Mobile Stats */}
                                        <div className="md:hidden flex items-center gap-4 text-sm text-zinc-500">
                                            <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {proposal.upvotes}</span>
                                            <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {proposal.commentsCount} comments</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Column (Mobile hidden or reordered) */}
                                <div className="flex items-center ml-auto gap-4 min-w-[80px] py-2 mt-auto">
                                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 group-hover:text-green-700 transition-colors">
                                        <ThumbsUp className="w-6 h-6" />
                                        <span className="font-bold">{proposal.upvotes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                                        <MessageSquare className="w-6 h-6" />
                                        <span className="font-bold">{proposal.commentsCount}</span>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </Link>
                ))}
                {/* ... closes map ... */
                }
            </div>

            <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    );
}
