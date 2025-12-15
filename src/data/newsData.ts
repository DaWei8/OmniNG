export type NewsCategory =
    | 'Economic'
    | 'Political'
    | 'Geopolitical'
    | 'Financial'
    | 'Technology'
    | 'Security'
    | 'Religious'
    | 'Sports'
    | 'Entertainment';

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    content?: string; // Full content link or text
    category: NewsCategory;
    source: string;
    date: string; // ISO date string preferred for sorting
    imageUrl?: string;
    readTime?: string;
    author?: string;
}