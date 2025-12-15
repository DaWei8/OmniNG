"use client";

import { useActionState } from "react";
import { adminLogin } from "@/actions/auth";
import { Loader2, ShieldCheck } from "lucide-react";

const initialState = {
    error: null as string | null,
};

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(adminLogin, initialState);

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-900/50">
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-2">Admin Portal</h1>
                    <p className="text-zinc-400 text-sm">Authorized personnel only.</p>
                </div>

                <form action={formAction} className="space-y-4">
                    {state?.error && (
                        <div className="p-3 bg-red-900/20 text-red-500 text-sm font-medium rounded-xl border border-red-900/50 text-center">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                            Admin ID / Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="admin@whathappening.ng"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-600 transition-all placeholder-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                            Secure Key
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-600 transition-all placeholder-zinc-700"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying Credentials...
                            </>
                        ) : (
                            "Access Dashboard"
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-zinc-600">
                        Unauthorized access attempts are logged and reported.
                    </p>
                </div>
            </div>
        </div>
    );
}
