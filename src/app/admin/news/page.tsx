import { createClient } from "@/utils/supabase/server";
import NewsList from "./NewsList";

export default async function AdminNewsPage() {
    const supabase = await createClient();
    const { data: news } = await supabase.from("news").select("*").order("created_at", { ascending: false });

    return <NewsList news={news || []} />;
}
