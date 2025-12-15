"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getProposals(category = "All", search = "") {
    const supabase = await createClient();

    let query = supabase
        .from("proposals")
        .select("*, profiles(full_name), votes(user_id), comments(id)")
        .order("created_at", { ascending: false });

    if (category !== "All") {
        query = query.eq("category", category);
    }

    if (search) {
        query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching proposals:", error);
        return [];
    }

    return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        summary: p.summary,
        category: p.category,
        status: p.status,
        date: new Date(p.created_at).toLocaleDateString(),
        author: p.profiles?.full_name || "Citizen",
        upvotes: p.votes?.length || 0,
        commentsCount: p.comments?.length || 0,
        hasVoted: false
    }));
}

export async function getProposal(id: string) {
    const supabase = await createClient();

    const { data: proposal, error } = await supabase
        .from("proposals")
        .select("*, profiles(full_name), votes(user_id), comments(id, content, created_at, profiles(full_name, avatar_url))")
        .eq("id", id)
        .single();

    if (error) {
        return null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    return {
        ...proposal,
        author: proposal.profiles?.full_name || "Citizen",
        upvotes: proposal.votes?.length || 0,
        commentsCount: proposal.comments?.length || 0,
        hasVoted: user ? proposal.votes.some((v: any) => v.user_id === user.id) : false,
        comments: proposal.comments.map((c: any) => ({
            id: c.id,
            content: c.content,
            author: c.profiles?.full_name || "Citizen",
            avatar: c.profiles?.avatar_url,
            createdAt: c.created_at
        }))
    };
}

export async function createProposal(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
        return { error: "You must be logged in to create a proposal." };
    }

    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    const { error } = await supabase.from("proposals").insert({
        author_id: user.id,
        title,
        summary,
        category,
        content,
        status: "Proposed",
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/proposals");
    redirect("/proposals");
}

export async function addComment(proposalId: string, content: string) {
    const supabase = await createClient();


    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase.from("comments").insert({
        proposal_id: proposalId,
        user_id: user.id,
        content
    });

    if (error) throw error;
    revalidatePath(`/proposals/${proposalId}`);
}

export async function toggleVote(proposalId: string) {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) throw new Error("Unauthorized");

    // Check if exists
    const { data: existingVote } = await supabase
        .from("votes")
        .select("id")
        .eq("proposal_id", proposalId)
        .eq("user_id", user.id)
        .single();

    if (existingVote) {
        await supabase.from("votes").delete().eq("id", existingVote.id);
    } else {
        await supabase.from("votes").insert({
            proposal_id: proposalId,
            user_id: user.id
        });
    }

    revalidatePath(`/proposals/${proposalId}`);
    revalidatePath("/proposals");
}
