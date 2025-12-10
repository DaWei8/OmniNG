"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- Middleware-like check for Admin Actions ---
async function checkAdmin() {
    const supabase = await createClient(); // Use async createClient

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Unauthorized");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        throw new Error("Forbidden: Admin access only");
    }

    return { supabase, user };
}

// --- News Actions ---

export async function createNews(formData: FormData) {
    const { supabase, user } = await checkAdmin();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const summary = formData.get("summary") as string;

    const { error } = await supabase.from("news").insert({
        title,
        content,
        summary,
        author_id: user.id,
    });

    if (error) throw new Error(error.message);

    revalidatePath("/news");
    revalidatePath("/admin/news");
}

export async function deleteNews(id: string) {
    const { supabase } = await checkAdmin();

    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/news");
    revalidatePath("/admin/news");
}

export async function updateNews(id: string, formData: FormData) {
    const { supabase } = await checkAdmin();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const summary = formData.get("summary") as string;

    const { error } = await supabase.from("news").update({
        title,
        content,
        summary
    }).eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/news");
    revalidatePath("/admin/news");
}


// --- Proposal Moderation Actions ---

export async function approveProposal(proposalId: string) {
    const { supabase } = await checkAdmin();

    const { error } = await supabase
        .from("proposals")
        .update({ status: "Approved" })
        .eq("id", proposalId);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/proposals");
}

export async function deleteProposal(proposalId: string, reason: string) {
    const { supabase } = await checkAdmin();

    // "Soft Delete" replaces content with a censor message
    const censorMessage = `This proposal has been removed because it violates our ethical and safe guidelines. Reason: ${reason}`;

    // First get existing title to append [Removed]
    const { data: existing } = await supabase.from("proposals").select("title").eq("id", proposalId).single();
    const newTitle = existing ? "[Removed] " + existing.title : "[Removed] Content";

    const { error } = await supabase
        .from("proposals")
        .update({
            is_deleted: true,
            deletion_reason: reason,
            content: censorMessage,
            summary: "Content Removed",
            title: newTitle,
            status: "Removed"
        })
        .eq("id", proposalId);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/proposals");
    revalidatePath(`/proposals/${proposalId}`);
}

export async function deleteComment(commentId: string) {
    const { supabase } = await checkAdmin();

    // Hard delete or Soft delete? User asked to "delete comments that violate terms".
    // Let's do a hard delete for simplicity, or we could flag them. 
    // Given the context of "violates terms", hard delete is often appropriate or replacing content.
    // Let's replace content for transparency if possible, but user said "delete". 
    // I will implement a hard delete for now.
    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (error) throw new Error(error.message);

    // We cannot easily revalidate the specific proposal path without fetching it first, 
    // but usually this is called from the context of a proposal page or admin view.
    // For now we won't revalidate specific paths unless we pass the proposal ID.
}


// --- Solution Actions ---

export async function createSolution(formData: FormData) {
    const { supabase, user } = await checkAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string || "Proposed";

    const { error } = await supabase.from("solutions").insert({
        title,
        description,
        category,
        status,
        author_id: user.id
    });

    if (error) throw new Error(error.message);

    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
}

export async function deleteSolution(id: string) {
    const { supabase } = await checkAdmin();
    const { error } = await supabase.from("solutions").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
}

export async function updateSolution(id: string, formData: FormData) {
    const { supabase } = await checkAdmin();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase.from("solutions").update({
        title,
        description,
        category,
        status
    }).eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
}
