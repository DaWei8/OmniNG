import { Official } from "@/lib/types";

export const createOfficial = (
    partial: Partial<Official> & { id: number; name: string; position: string; role: Official['role'] }
): Official => {
    return {
        state: "Federal", // Default
        party: "APC",     // Default for current admin appointees
        rating: 3.0,      // Neutral start
        promises: { kept: 2, broken: 0, pending: 5 },
        image: "", // Placeholder
        description: `${partial.name} serves as the ${partial.position}.`,
        residence: "Abuja, Nigeria",
        contact: {
            email: "info@gov.ng",
            phone: "+234 000 000 0000",
            officeAddress: "National Assembly/Federal Secretariat, Abuja"
        },
        achievements: ["Legislative contributions", "Committee participation"],
        manifesto: {
            title: "Legislative Agenda",
            summary: "Commitment to passing bills that favor the constituency.",
            points: ["Constituency Projects", "Oversight Functions"]
        },
        financials: {
            estimatedNetWorth: "Undisclosed",
            allowances: "Undisclosed",
        },
        ...partial, // Overwrite defaults with specific data passed in
    };
};
