import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // PHASE 1: Authentication Logic Removed
    // We are bypassing the server-side auth check to isolate the "Refresh Token" error.
    // const supabase = await createClient();
    // const { data: { session } } = await supabase.auth.getSession();
    // const user = session?.user;

    // if (!user) {
    //     // redirect("/admin-login");
    // }

    // const { data: profile } = await supabase
    //     .from("profiles")
    //     .select("role")
    //     .eq("id", user.id)
    //     .single();

    // if (!profile || profile.role !== "admin") {
    //     // redirect("/admin-login");
    // }

    return (
        <AdminShell>
            {children}
        </AdminShell>
    );
}
