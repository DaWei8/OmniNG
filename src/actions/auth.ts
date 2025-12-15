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
    const username = formData.get("username") as string;
    const fullName = formData.get("fullName") as string;
    const state = formData.get("state") as string;
    const country = formData.get("country") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    if (username.length > 15) {
        return { error: "Username must be 15 characters or less." };
    }

    try {
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
                    username,
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

    revalidatePath("/", "layout");
    redirect(`/check-email?email=${encodeURIComponent(email)}`);
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
}

export async function adminLogin(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            return { error: "Invalid credentials." };
        }

        const user = data.user;
        if (!user) {
            return { error: "Authentication failed." };
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "admin") {
            await supabase.auth.signOut();
            return { error: "Access denied: Restricted to Administrators." };
        }

    } catch (e) {
        console.error("Admin Login Error:", e);
        return { error: "System error during login." };
    }

    revalidatePath("/admin", "layout");
    redirect("/admin");
}
