export interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
    likes: number;
    verified?: boolean; // Author is a verified user
}

export interface Proposal {
    id: number;
    title: string;
    author: string;
    date: string;
    category: "Infrastructure" | "Education" | "Health" | "Economy" | "Security" | "Environment" | "Other";
    status: "Proposed" | "Under Review" | "Adopted" | "Rejected";
    summary: string;
    content: string;
    upvotes: number;
    comments: Comment[];
    tags: string[];
}

export const proposalsData: Proposal[] = [
    {
        id: 1,
        title: "National Solar Grid Integration Plan",
        author: "Dr. Adebayo Ogunlesi",
        date: "2024-03-15",
        category: "Infrastructure",
        status: "Under Review",
        summary: "A proposal to integrate decentralized solar micro-grids into the national power grid to stabilize electricity supply.",
        content: `
            <h3>Overview</h3>
            <p>Nigeria faces a persistent energy crisis. This proposal suggests a framework for private solar micro-grid operators to feed excess power back into the national grid at regulated feed-in tariffs.</p>
            
            <h3>Key Objectives</h3>
            <ul>
                <li>Stabilize the national grid with distributed generation.</li>
                <li>Incentivize renewable energy investment.</li>
                <li>Reduce reliance on fossil fuel generators.</li>
            </ul>

            <h3>Implementation Strategy</h3>
            <p>Phase 1 involves pilot projects in Lagos and Kano industrial zones...</p>
        `,
        upvotes: 1250,
        tags: ["Energy", "Solar", "Infrastructure"],
        comments: [
            { id: 101, author: "Chinedu I.", content: "This is long overdue. The current grid is too fragile.", date: "2024-03-16", likes: 45, verified: true },
            { id: 102, author: "Fatima A.", content: "How will the feed-in tariffs be regulated to prevent exploitation?", date: "2024-03-16", likes: 12, verified: false }
        ]
    },
    {
        id: 2,
        title: "Digital Literacy Curriculum for Primary Schools",
        author: "Ngozi Okonjo-Iweala (Honorary)",
        date: "2024-03-20",
        category: "Education",
        status: "Proposed",
        summary: "Mandatory coding and digital literacy classes for all public primary schools starting from Primary 4.",
        content: `
            <h3>Proposal</h3>
            <p>To prepare the next generation for the global digital economy, we must start early. This proposal mandates a standardized digital literacy curriculum.</p>
            
             <h3>Funding</h3>
             <p>Proposed funding through a 0.5% levy on telecommunication profits...</p>
        `,
        upvotes: 3400,
        tags: ["Education", "Tech", "Youth"],
        comments: [
            { id: 201, author: "Emeka O.", content: "Great initiative, but do we have the teachers/infrastructure?", date: "2024-03-21", likes: 88, verified: true }
        ]
    },
    {
        id: 3,
        title: "Agro-Processing Zones in Every Geopolitical Zone",
        author: "Farmers Association of Nigeria",
        date: "2024-03-10",
        category: "Economy",
        status: "Adopted",
        summary: " establishment of specialized agro-processing zones to reduce food waste and increase export value.",
        content: "Detailed plan on location and crop specialization for each zone...",
        upvotes: 980,
        tags: ["Agriculture", "Economy", "Food Security"],
        comments: []
    }
];
