export type NewsCategory =
    | 'Economic'
    | 'Political'
    | 'Geopolitical'
    | 'Financial'
    | 'Technology'
    | 'Security'
    | 'Religious'
    | 'Sports'
    | 'Entertainment';

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    content?: string; // Full content link or text
    category: NewsCategory;
    source: string;
    date: string; // ISO date string preferred for sorting
    imageUrl?: string;
    readTime?: string;
    author?: string;
}

export const newsData: NewsItem[] = [
    {
        id: 'n1',
        title: 'Central Bank Introduces New Forex Policy',
        summary: 'The CBN has announced a floating exchange rate mechanism to unify the forex windows, a move expected to stabilize the Naira in the long term.',
        category: 'Financial',
        source: 'Business Day',
        date: '2024-12-06',
        readTime: '5 min read',
        author: 'Emeka Ugochukwu'
    },
    {
        id: 'n2',
        title: 'Senate Passes 2025 Budget Appropriation Bill',
        summary: 'The Senate has passed the 2025 budget with a focus on infrastructure, education, and healthcare, increasing the total expenditure by 15%.',
        category: 'Political',
        source: 'The Guardian',
        date: '2024-12-05',
        readTime: '8 min read',
        author: 'Taiwo Adebayo'
    },
    {
        id: 'n3',
        title: 'Lagos Tech Week Draws Global Investors',
        summary: 'Over 500 million dollars in pledged investments as global venture capitalists convene in Lagos for the annual Tech Week.',
        category: 'Technology',
        source: 'TechCabal',
        date: '2024-12-04',
        readTime: '4 min read',
        author: 'Fara Williams'
    },
    {
        id: 'n4',
        title: 'New Security Architecture Deployed in North West',
        summary: 'The military has launched Operation "Peace Force" utilizing drones and rapid response units to curb banditry in Zamfara and Katsina.',
        category: 'Security',
        source: 'Punch',
        date: '2024-12-03',
        readTime: '6 min read',
        author: 'Kabir Yusuf'
    },
    {
        id: 'n5',
        title: 'Inflation Rates Drop Marginally in Q4',
        summary: 'NBS reports a 0.5% decrease in inflation rates, attributed to harvest season ease on food prices.',
        category: 'Economic',
        source: 'Nairametrics',
        date: '2024-12-02',
        readTime: '3 min read',
        author: 'Chinedu Okeke'
    },
    {
        id: 'n6',
        title: 'ECOWAS Summit Addresses Regional Stability',
        summary: 'West African leaders meet in Abuja to discuss the transition timetables for junta-led neighbors.',
        category: 'Geopolitical',
        source: 'Reuters Africa',
        date: '2024-12-01',
        readTime: '7 min read',
        author: 'Fatima Mohammed'
    },
    {
        id: 'n7',
        title: 'Religious Leaders Call for National Unity',
        summary: 'The Inter-Religious Council has issued a joint communique urging tolerance and dialogue amidst rising tensions.',
        category: 'Religious',
        source: 'Vanguard',
        date: '2024-11-30',
        readTime: '3 min read',
        author: 'Pastor John & Imam Ahmed'
    },
    {
        id: 'n8',
        title: 'Fintech Giant "PayQuick" Acquires Microfinance Bank',
        summary: 'In a bid to expand credit services to rural areas, PayQuick completes the acquisition of Unity MFB.',
        category: 'Financial',
        source: 'TechPoint',
        date: '2024-11-29',
        readTime: '5 min read',
        author: 'Simi Johnson'
    },
    {
        id: 'n9',
        title: 'Oil Production Hits 1.7m Barrels Per Day',
        summary: 'NNPC announces a significant milestone in daily oil production, boosting government revenue prospects.',
        category: 'Economic',
        source: 'ThisDay',
        date: '2024-11-28',
        readTime: '4 min read',
        author: 'Bode George'
    },
    {
        id: 'n10',
        title: 'National Assembly Proposes Cybercrime Act Amendment',
        summary: 'Lawmakers want stricter penalties for digital fraud and better data protection clauses.',
        category: 'Political',
        source: 'Premium Times',
        date: '2024-11-27',
        readTime: '6 min read',
        author: 'Grace Edem'
    },
    {
        id: 'n11',
        title: 'Startups in Aba Receive Government Grant',
        summary: 'The Abia State government awards grants to 50 manufacturing startups to boost local production.',
        category: 'Technology',
        source: 'Business Insider',
        date: '2024-11-26',
        readTime: '4 min read',
        author: 'Nnamdi Kanu'
    },
    {
        id: 'n12',
        title: 'Border Security Tightened Ahead of Holidays',
        summary: 'Customs and Immigration services increase patrols to prevent smuggling and illegal crossings.',
        category: 'Security',
        source: 'Daily Trust',
        date: '2024-11-25',
        readTime: '3 min read',
        author: 'Musa Ibrahim'
    }
];
