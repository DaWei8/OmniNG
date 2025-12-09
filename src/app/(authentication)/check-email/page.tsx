import Link from "next/link";
import { Mail } from "lucide-react";


export default async function CheckEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const email = (await searchParams).email;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700 dark:text-green-500">
                    <Mail className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">Check Your Email</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    We've sent a confirmation link to <span className="font-bold text-zinc-900 dark:text-white">{email}</span>. Please click the link to verify your account and start using OmniNG.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="block w-full py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-xl transition-all shadow-lg"
                    >
                        Back to Login
                    </Link>
                    <p className="text-sm text-zinc-500">
                        Didn't receive the email? <span className="text-green-700 font-bold cursor-pointer hover:underline">Resend</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
