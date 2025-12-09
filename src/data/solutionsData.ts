
export type OrganizationType = 'Business' | 'NGO' | 'Social Enterprise' | 'Community Project';

export type Sector =
    | 'Fintech'
    | 'Agriculture'
    | 'Education'
    | 'Healthcare'
    | 'Clean Energy'
    | 'Civic Tech'
    | 'Logistics'
    | 'Infrastructure';

export interface Solution {
    id: string;
    name: string;
    description: string;
    problemSolved: string;
    type: OrganizationType;
    sector: Sector;
    location: string;
    website: string;
    imageUrl?: string;
    impactMetrics?: string[];
    foundedYear: number;
}

export const solutionsData: Solution[] = [
    {
        id: '1',
        name: 'FarmCrowdy',
        description: 'Empowering smallscale farmers with technology, seeds, and access to markets.',
        problemSolved: 'Food security and farmer poverty by connecting investors to farmers.',
        type: 'Business',
        sector: 'Agriculture',
        location: 'Lagos, Nigeria',
        website: 'https://farmcrowdy.com',
        foundedYear: 2016,
        impactMetrics: ['25,000+ Farmers Empowered', '3M+ Chickens Raised', 'Type: Agritech'],
    },
    {
        id: '2',
        name: 'BudgIT',
        description: 'Simplifying the Nigerian budget and public data for citizens.',
        problemSolved: 'Lack of transparency in government spending and civic engagement.',
        type: 'NGO',
        sector: 'Civic Tech',
        location: 'Lagos, Abuja',
        website: 'https://yourbudgit.com',
        foundedYear: 2011,
        impactMetrics: ['15M+ Citizens Reached', 'Tracked 5,000+ Projects'],
    },
    {
        id: '3',
        name: 'LifeBank',
        description: 'Delivering critical medical supplies like blood and oxygen to hospitals.',
        problemSolved: 'Preventable deaths due to lack of access to blood and essential medical supplies.',
        type: 'Social Enterprise',
        sector: 'Healthcare',
        location: 'Lagos, Nigeria',
        website: 'https://lifebank.ng',
        foundedYear: 2016,
        impactMetrics: ['40,000+ Lives Saved', '24/7 Delivery'],
    },
    {
        id: '4',
        name: 'Andela',
        description: 'Connecting African software engineers with global opportunities.',
        problemSolved: 'Unemployment among talented youth and global tech talent shortage.',
        type: 'Business',
        sector: 'Education',
        location: 'Remote / Lagos',
        website: 'https://andela.com',
        foundedYear: 2014,
        impactMetrics: ['100,000+ Engineers Trained', 'Global Unicorn'],
    },
    {
        id: '5',
        name: 'Paystack',
        description: 'Helping businesses in Africa get paid by anyone, anywhere in the world.',
        problemSolved: 'Difficulty in processing online payments and digital commerce.',
        type: 'Business',
        sector: 'Fintech',
        location: 'Lagos, Nigeria',
        website: 'https://paystack.com',
        foundedYear: 2015,
        impactMetrics: ['60,000+ Businesses', 'Acquired by Stripe'],
    },
    {
        id: '6',
        name: 'Renewable Africa 365',
        description: 'Providing off-grid solar solutions to rural communities.',
        problemSolved: 'Lack of reliable electricity in rural areas.',
        type: 'NGO',
        sector: 'Clean Energy',
        location: 'Kaduna, Nigeria',
        website: 'https://example.org',
        foundedYear: 2019,
        impactMetrics: ['50 Communities Light Up', 'Zero Carbon Emissions'],
    },
    {
        id: '7',
        name: 'Kobo360',
        description: 'Logistics platform connecting cargo owners to truck owners.',
        problemSolved: 'Inefficient supply chain and logistics transparency.',
        type: 'Business',
        sector: 'Logistics',
        location: 'Lagos, Nigeria',
        website: 'https://kobo360.com',
        foundedYear: 2017,
        impactMetrics: ['50,000+ Trucks', 'Pan-African Operations'],
    },
    {
        id: '8',
        name: 'Teach For Nigeria',
        description: 'Recruiting promising leaders to teach in underserved schools.',
        problemSolved: 'Educational inequality and teacher shortage.',
        type: 'NGO',
        sector: 'Education',
        location: 'Ogun, Lagos, Kaduna',
        website: 'https://teachfornigeria.org',
        foundedYear: 2017,
        impactMetrics: ['500+ Fellows', '100+ Schools Impacted'],
    }
];
