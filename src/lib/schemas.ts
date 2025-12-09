import { z } from "zod";

export const NEWS_CATEGORIES = [
    'All',
    'Economic',
    'Political',
    'Geopolitical',
    'Financial',
    'Technology',
    'Security',
    'Religious',
    'Sports',
    'Entertainment'
] as const;

export const NewsItemSchema = z.object({
    title: z.string().min(1, "Title is required"),
    snippet: z.string().min(1, "Snippet is required").max(280, "Snippet must be less than 280 characters"),
    original_url: z.string().url("Must be a valid URL"),
    publisher: z.string().min(1, "Publisher is required"),
    author: z.string().optional(),
    category: z.enum(NEWS_CATEGORIES),
    is_published: z.boolean().default(true),
});

export type NewsItemInput = z.infer<typeof NewsItemSchema>;
