import { createClient } from "@/utils/supabase/server";
import SolutionsList from "./SolutionsList";

export default async function AdminSolutionsPage() {
    const supabase = await createClient();
    const { data: solutions } = await supabase.from("solutions").select("*").order("created_at", { ascending: false });

    return <SolutionsList solutions={solutions || []} />;
}
