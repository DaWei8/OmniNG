"use server";

import { createClient } from "@/utils/supabase/server";

export async function getNews(category = "All", search = "") {

    const supabase = await createClient()

    try {
        let { data: news, error } = await supabase
            .from("news")
            .select("*")
            .order("published_at", { ascending: false });

        if (error) {
            console.error("Supabase error fetching news:", error);
            throw new Error(error.message);
        }

        if (category !== "All") {
            news = news!.filter(item => item.category === category);
        }

        if (search) {
            news = news!.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase()));
        }

        if (!news || news.length === 0) {
            return [];
        }

        return news.map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            category: item.category,
            source: item.source || "OmniNG",
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            imageUrl: item.image_url,
            readTime: item.read_time || "5 min read",
            author: item.author || "Editor"
        }));

    } catch (e) {
        console.error("News fetch failed (using mock data):", e);
        return [];
    }
}

export async function getNewsByTitleOrId(identifier: string) {
    const supabase = await createClient();

    try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

        let query = supabase.from("news").select("*");

        if (isUuid) {
            query = query.eq("id", identifier);
        } else {
            let decoded = identifier.replace(/pcnt/g, '%');
            const deSlugified = decoded.replace(/-/g, ' ');
            const exact = decoded;

            const queryFilter = `title.ilike."${exact}",title.ilike."${deSlugified}"`;
            query = query.or(queryFilter);
        }

        const { data: item, error } = await query.single();

        if (error) {
            throw error;
        }

        if (!item) return null;

        return {
            id: item.id,
            title: item.title,
            summary: item.summary,
            category: item.category,
            source: item.source || "Whathappening",
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            imageUrl: item.image_url,
            readTime: item.read_time || "5 min read",
            author: item.author || "Editor",
            content: item.content
        };

    } catch (e) {
        console.error("Error fetching single news item:", e);
        return null;
    }
}


export async function getNewsByCategory(category: string, limit: number = 3) {
    const supabase = await createClient();

    try {
        let query = supabase
            .from("news")
            .select("*")
            .eq("category", category)
            .order("published_at", { ascending: false })
            .limit(limit);

        const { data: news, error } = await query;

        if (error) {
            console.error(`Supabase error fetching news for category ${category}:`, error);
            throw new Error(error.message);
        }

        if (!news || news.length === 0) {
            return [];
        }

        return news.map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            category: item.category,
            source: item.source || "Whathappening",
            date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            imageUrl: item.image_url,
            readTime: item.read_time || "5 min read",
            author: item.author || "Editor"
        }));

    } catch (e) {
        console.error(`Error fetching news for category ${category}:`, e);
        return [];
    }
}
