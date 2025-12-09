"use client";

import { toggleVote } from "@/actions/proposals";
import { ThumbsUp } from "lucide-react";
import { useOptimistic, useTransition, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function VoteButton({ proposalId, initialCount, initialHasVoted, currentUser }: any) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // React 19's useOptimistic takes initial state and a reducer-like function.
    // However, if we are not passing data to the action via optimistic, we just update local state.
    // Simpler: just use local state if not doing complex optimistic action binding.
    // But since server action is async, useOptimistic is perfect.

    const [state, setOptimisticState] = useOptimistic(
        { count: initialCount || 0, hasVoted: initialHasVoted || false },
        (currentState: { count: number, hasVoted: boolean }) => ({
            count: currentState.hasVoted ? currentState.count - 1 : currentState.count + 1,
            hasVoted: !currentState.hasVoted
        })
    );

    const handleVote = () => {
        if (!currentUser) {
            router.push("/login");
            return;
        }

        startTransition(async () => {
            setOptimisticState(null); // Updates the optimistic state immediately based on reducer logic
            await toggleVote(proposalId);
        });
    };

    return (
        <button
            onClick={handleVote}
            disabled={isPending}
            className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                state.hasVoted
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 hover:bg-green-200"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-green-100 hover:text-green-700"
            )}
        >
            <ThumbsUp className={clsx("w-5 h-5", state.hasVoted && "fill-current")} />
            <span className="font-bold">{state.count}</span>
        </button>
    )
}
