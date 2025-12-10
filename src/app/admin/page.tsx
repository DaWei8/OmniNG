import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { count: pendingCount } = await supabase
        .from("proposals")
        .select("*", { count: "exact", head: true })
        .eq("status", "Proposed");

    const { count: newsCount } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true });

    const { count: removedCount } = await supabase
        .from("proposals")
        .select("*", { count: "exact", head: true })
        .eq("status", "Removed");

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Welcome to the administration control center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Pending Proposals</h3>
                    <p className="text-3xl font-bold text-green-600">{pendingCount || 0}</p>
                    <p className="text-sm text-zinc-500 mt-2">Requires moderation</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Total News Articles</h3>
                    <p className="text-3xl font-bold text-blue-600">{newsCount || 0}</p>
                    <p className="text-sm text-zinc-500 mt-2">Published content</p>
                </div>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Removed Content</h3>
                    <p className="text-3xl font-bold text-red-600">{removedCount || 0}</p>
                    <p className="text-sm text-zinc-500 mt-2">Violating guidelines</p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 overflow-hidden">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <h4 className="font-semibold">Review Latest Proposals</h4>
                        <p className="text-sm text-zinc-500 mb-3">Check what citizens are submitting.</p>
                        <a href="/admin/proposals" className="text-sm text-green-600 font-medium hover:underline">Go to Moderation &rarr;</a>
                    </div>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <h4 className="font-semibold">Publish News Update</h4>
                        <p className="text-sm text-zinc-500 mb-3">Keep citizens informed with official news.</p>
                        <a href="/admin/news" className="text-sm text-green-600 font-medium hover:underline">Draft News &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
