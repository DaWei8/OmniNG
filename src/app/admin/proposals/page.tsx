import { createClient } from "@/utils/supabase/server";
import ProposalsList from "./ProposalsList";

export default async function AdminProposalsPage() {
    const supabase = await createClient();

    const { data: proposals, error } = await supabase
        .from("proposals")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading proposals</div>;
    }

    return <ProposalsList proposals={proposals || []} />;
}