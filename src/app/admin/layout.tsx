import { createClient } from "@/utils/supabase/server";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Ideally, uncomment this protection logic for production
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // if (!user) {
    //     redirect("/login");
    // }

    // const { data: profile } = await supabase
    //     .from("profiles")
    //     .select("role")
    //     .eq("id", user.id)
    //     .single();

    // if (!profile || profile.role !== "admin") {
    //     // Handle unauthorized
    // }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex">
            {/* Sidebar Client Component */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 md:hidden">
                    <span className="font-bold">Admin Panel</span>
                    {/* Mobile toggle could go here if implemented sharing state with sidebar */}
                </header>
                <div className="p-8 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
