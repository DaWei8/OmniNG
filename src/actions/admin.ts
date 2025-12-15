"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
    const supabase = await createClient();

    // PHASE 1: Authentication Logic Removed
    // We are temporarily returning the client without verifying the user.
    // NOTE: Database RLS policies may still block requests if there is no active session.

    // Attempt to get session just for context, but suppress ALL errors
    let user = null;
    try {
        const { data } = await supabase.auth.getSession();
        user = data.session?.user;
    } catch (e) {
        console.log("Suppressing auth error in checkAdmin during debug phase.");
    }

    return { supabase, user: user || { id: "debug-mode" } };
}

export async function createNews(formData: FormData) {
    const { supabase, user } = await checkAdmin();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const source = formData.get("source") as string;
    const read_time = formData.get("read_time") as string;

    const { error } = await supabase.from("news").insert({
        author,
        source,
        read_time,
        title,
        content,
        summary,
        category
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
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const summary = formData.get("summary") as string;
    const author = formData.get("author") as string;
    const source = formData.get("source") as string;
    const read_time = formData.get("read_time") as string;

    const { error } = await supabase
        .from("news")
        .update({ title, category, content, summary, author, source, read_time })
        .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/news");
    revalidatePath("/admin/news");
}

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

    const { data: existing } = await supabase
        .from("proposals")
        .select("title")
        .eq("id", proposalId)
        .single();

    const newTitle = existing ? "[Removed] " + existing.title : "[Removed] Content";

    const { error } = await supabase
        .from("proposals")
        .update({
            is_deleted: true,
            deletion_reason: reason,
            content: `This proposal has been removed because it violates our ethical and safe guidelines. Reason: ${reason}`,
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

    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) throw new Error(error.message);
}

export async function createSolution(formData: FormData) {
    const { supabase, user } = await checkAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const status = (formData.get("status") as string) || "Proposed";

    const { error } = await supabase.from("solutions").insert({
        title,
        description,
        category,
        status
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

    const { error } = await supabase
        .from("solutions")
        .update({ title, description, category, status })
        .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/solutions");
    revalidatePath("/admin/solutions");
}