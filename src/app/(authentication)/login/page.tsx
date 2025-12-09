"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";
import { Loader2 } from "lucide-react";

const initialState = {
    error: null as string | null,
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-zinc-500">Log in to continue your journey.</p>
                </div>

                <form action={formAction} className="space-y-4">
                    {state?.error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium rounded-xl border border-red-100 dark:border-red-900/50">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Logging In...
                            </>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-zinc-500">
                    Don't have an account?{" "}
                    <Link href="/join" className="text-green-700 font-bold hover:underline">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}
