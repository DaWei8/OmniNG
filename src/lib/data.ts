import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase"; // Assuming types exist, otherwise utilize 'any' or define interface locally if needed. 
// Note: User prompt didn't strictly say to use generated types, but it's good practice. I'll use 'any' if I'm not sure types exist to avoid errors, or try to infer.
// Actually, I'll define a return type based on the table structure.

export type NewsItem = {
    id: string;
    created_at: string;
    title: string;
    snippet: string;
    original_url: string;
    publisher: string;
    author: string | null;
    category: string;
    is_published: boolean;
};

export async function getNewsItems(category?: string, page: number = 1) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const LIMIT = 20;
    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    let query = supabase
        .from("news_items")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (category && category !== "All") {
        query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching news items:", error);
        throw new Error("Failed to fetch news items");
    }

    return data as NewsItem[];
}
