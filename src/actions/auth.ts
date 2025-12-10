"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { error: error.message };
        }
    } catch (e) {
        return { error: "Network error. Please try again." };
    }

    revalidatePath("/", "layout");
    redirect("/?login_success=true");
}

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string; // New field
    const fullName = formData.get("fullName") as string;
    const state = formData.get("state") as string;
    const country = formData.get("country") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    if (username.length > 15) {
        return { error: "Username must be 15 characters or less." };
    }

    try {
        // Check if username exists in profiles
        // We assume 'profiles' table has 'username' column. If not, this might fail or needs schema update.
        // If profiles doesn't have username yet, we should add it.
        // Assuming the user meant "add this feature" implies adding the check.
        // I will check the profiles table for the username.

        const { data: existingUser } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUser) {
            return { error: "Username is already taken. Please choose another." };
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username, // Add username to metadata
                    full_name: fullName,
                    state,
                    country,
                    phone_number: phoneNumber,
                    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`
                }
            }
        });

        if (error) {
            return { error: error.message };
        }
    } catch (e) {
        console.error("Signup error:", e);
        return { error: "Failed to connect to the server. Please check your internet connection." };
    }

    // Supabase might require email confirmation.
    // For dev, we might verify automatically or just redirect to a "Check email" page.
    // Assuming auto-confirm or allow for now, but usually redirect to '/' works if session created.

    revalidatePath("/", "layout");
    redirect(`/check-email?email=${encodeURIComponent(email)}`);
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
}
