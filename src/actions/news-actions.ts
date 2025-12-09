"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NewsItemSchema } from "@/lib/schemas";
import { ZodError } from "zod";

export async function addNewsItem(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Authenticate
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized: You must be logged in to add news items." };
    }

    // 2. Validate Input
    const rawData = {
        title: formData.get("title"),
        snippet: formData.get("snippet"),
        original_url: formData.get("original_url"),
        publisher: formData.get("publisher"),
        author: formData.get("author") || undefined, // Optional
        category: formData.get("category"),
        is_published: true, // Defaulting to true as per schema default, or could take from form
    };

    try {
        const validatedData = NewsItemSchema.parse(rawData);

        // 3. Insert Data
        const { error } = await supabase
            .from("news_items")
            .insert(validatedData);

        if (error) {
            if (error.code === "23505") { // Unique violation code (Postgres)
                return { error: "This link already exists." };
            }
            console.error("Database error:", error);
            return { error: "Failed to save news item." };
        }

        // 4. Revalidate
        revalidatePath("/news");
        return { success: true, message: "News item added successfully!" };

    } catch (e) {
        if (e instanceof ZodError) {
            return { error: e.errors[0].message }; // Return first validation error
        }
        return { error: "An unexpected error occurred." };
    }
}
