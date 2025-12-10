import { createClient } from "@/utils/supabase/server";

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
    const supabase = createClient();
    const LIMIT = 20;
    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    let query = (await supabase)
        .from("news_items")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (category && category !== "All") {
        query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching news items:", error);
        throw new Error("Failed to fetch news items");
    }

    return data as NewsItem[];
}
