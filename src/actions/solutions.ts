"use server";

import { createClient } from "@/utils/supabase/server";
import { solutionsData as mockSolutions, Solution, Sector } from "@/data/solutionsData";

export async function getSolutions(sector: Sector | 'All' = "All", search = "") {
    const supabase = await createClient();

    try {
        let { data: solutions, error } = await supabase
            .from("solutions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error fetching solutions:", error);

        }

        let mappedSolutions: Solution[] = [];

        if (solutions && solutions.length > 0) {
            mappedSolutions = solutions.map((item: any) => ({
                id: item.id,
                name: item.name || "Untitled Solution",
                description: item.description,
                problemSolved: item.problem_solved || "Addressed through community action.",
                type: (item.type || 'Community Project') as any,
                sector: (item.sector as Sector) || 'Infrastructure', // Mapped Category -> Sector
                location: item.location || 'Nigeria',
                website: item.website || '#',
                foundedYear: new Date(item.created_at).getFullYear(),
                impactMetrics: item.status ? [`Status: ${item.status}`] : [],
                imageUrl: item.image_url
            }));
        }

        let finalSolutions = mappedSolutions;
        if (finalSolutions.length === 0) {
            finalSolutions = mockSolutions;
        }
        if (sector !== "All") {
            finalSolutions = finalSolutions.filter(item => item.sector === sector);
        }

        if (search) {
            const searchLower = search.toLowerCase();
            finalSolutions = finalSolutions.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.problemSolved.toLowerCase().includes(searchLower)
            );
        }

        return finalSolutions;

    } catch (error) {
        console.error("Error in getSolutions:", error);
        return mockSolutions;
    }
}

export async function getSolutionById(id: string): Promise<Solution | null> {
    // 1. Try to find in Mock Data first (for legacy URLs using ID '1', '2' etc)
    const mockMatch = mockSolutions.find(s => s.id === id || s.name === decodeURIComponent(id));
    if (mockMatch) return mockMatch;

    // 2. Fetch from DB
    const supabase = await createClient();
    try {
        // Try fitting ID as UUID first? Supabase will error if invalid UUID.
        // Or search by Title if ID is not UUID?
        // Let's assume ID is UUID.

        const { data: item, error } = await supabase
            .from("solutions")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !item) {
            // Fallback: Try searching by Name/Title if ID fails (handling sluggish URLs)
            const { data: itemByName } = await supabase
                .from("solutions")
                .select("*")
                .eq("name", decodeURIComponent(id))
                .single();

            if (itemByName) {
                return {
                    id: itemByName.id,
                    name: itemByName.name || "Untitled Solution",
                    description: itemByName.description,
                    problemSolved: itemByName.problem_solved || "Addressed through community action.",
                    type: (itemByName.type || 'Community Project') as any,
                    sector: (itemByName.sector as Sector) || 'Infrastructure',
                    location: itemByName.location || 'Nigeria',
                    website: itemByName.website || '#',
                    foundedYear: new Date(itemByName.created_at).getFullYear(),
                    impactMetrics: itemByName.status ? [`Status: ${itemByName.status}`] : [],
                    imageUrl: itemByName.image_url
                };
            }

            return null;
        }

        return {
            id: item.id,
            name: item.name || "Untitled Solution",
            description: item.description,
            problemSolved: item.problem_solved || "Addressed through community action.",
            type: (item.type || 'Community Project') as any,
            sector: (item.sector as Sector) || 'Infrastructure',
            location: item.location || 'Nigeria',
            website: item.website || '#',
            foundedYear: new Date(item.created_at).getFullYear(),
            impactMetrics: item.status ? [`Status: ${item.status}`] : [],
            imageUrl: item.image_url
        };

    } catch (error) {
        console.error("Error fetching solution by ID:", error);
        return null;
    }
}
