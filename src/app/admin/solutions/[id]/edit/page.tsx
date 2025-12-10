import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import SolutionForm from "../../SolutionForm";

export default async function EditSolutionPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: solution } = await supabase.from("solutions").select("*").eq("id", id).single();

    if (!solution) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Edit Solution</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Update solution details and status.</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <SolutionForm initialData={solution} />
            </div>
        </div>
    );
}
