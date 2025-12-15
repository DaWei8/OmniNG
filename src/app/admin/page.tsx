import { createClient } from "@/utils/supabase/server";
import { TrendingUp, FileText, AlertTriangle, ArrowRight, Activity, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

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

    // Fetch recent logs or activities if available, for now just static recent actions placeholder or fetch recent news
    const { data: recentNews } = await supabase
        .from("news")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Dashboard Overview</h1>
                    <p className="text-zinc-500 mt-1">
                        Welcome back, Admin. Here's what's happening on the platform today.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(), "EEEE, MMMM do, yyyy")}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <Activity className="w-24 h-24 text-green-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-zinc-500 font-medium text-sm uppercase tracking-wider">Pending Proposals</h3>
                        <p className="text-4xl font-black text-zinc-900 dark:text-white mt-2">{pendingCount || 0}</p>
                        <p className="text-sm text-zinc-400 mt-1">Requires your attention</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <FileText className="w-24 h-24 text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-zinc-500 font-medium text-sm uppercase tracking-wider">Published News</h3>
                        <p className="text-4xl font-black text-zinc-900 dark:text-white mt-2">{newsCount || 0}</p>
                        <p className="text-sm text-zinc-400 mt-1">Articles live on platform</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        <AlertTriangle className="w-24 h-24 text-red-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl flex items-center justify-center mb-4">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h3 className="text-zinc-500 font-medium text-sm uppercase tracking-wider">Moderated Content</h3>
                        <p className="text-4xl font-black text-zinc-900 dark:text-white mt-2">{removedCount || 0}</p>
                        <p className="text-sm text-zinc-400 mt-1">Proposals removed</p>
                    </div>
                </div>
            </div>

            {/* Recent & Quick Actions Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Recent News Updates</h2>
                        <Link href="/admin/news" className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">
                            View All
                        </Link>
                    </div>
                    <div>
                        {recentNews && recentNews.length > 0 ? (
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {recentNews.map((news: any, idx) => (
                                    <div key={idx} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-zinc-900 dark:text-white line-clamp-1">{news.title}</p>
                                                <p className="text-xs text-zinc-500">
                                                    Published on {new Date(news.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Link href={`/news/${news.title}`} target="_blank" className="p-2 text-zinc-400 hover:text-green-600 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-zinc-500">No recent news found.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link href="/admin/proposals" className="group block w-full p-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-green-500/50 hover:bg-green-50/10 dark:hover:bg-green-900/10 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                        <Activity className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-green-600 transition-colors">Review Proposals</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>

                        <Link href="/admin/news/create" className="group block w-full p-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 transition-colors">Draft News Article</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
