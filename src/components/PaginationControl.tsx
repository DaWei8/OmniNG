
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationControl({ currentPage, totalPages, onPageChange }: PaginationControlProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Previous Page"
            >
                <ChevronLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>

            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Next Page"
            >
                <ChevronRight className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
        </div>
    );
}
