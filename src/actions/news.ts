"use server";

import { createClient } from "@/utils/supabase/server";
import { newsData as mockNews } from "@/data/newsData";

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
            // Using ilike for case-insensitive search on title or summary
            news = news!.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase()));
        }

        if (!news || news.length === 0) {
            return filterMockNews(category, search);
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
        console.error("News fetch failed (using mock data):", e);
        return filterMockNews(category, search);
    }
}

function filterMockNews(category: string, search: string) {
    return mockNews.filter(item => {
        const matchesCategory = category === 'All' || item.category === category;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.summary.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}
