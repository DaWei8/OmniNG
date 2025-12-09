"use client";

import React from 'react';
import { Building2, Globe, FileBarChart, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DataSourcesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Data <span className="text-green-500">Sources</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        We believe in radical transparency. Here is a comprehensive list of where our data comes from.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-5 py-16">

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Government Sources */}
                    <Section title="Government & Official" icon={Building2}>
                        <SourceItem
                            name="Budget Office of the Federation"
                            url="https://budgetoffice.gov.ng"
                            description="Federal budget allocations and performance reports."
                        />
                        <SourceItem
                            name="Independent National Electoral Commission (INEC)"
                            url="https://inecnigeria.org"
                            description="Election results, polling unit data, and candidate lists."
                        />
                        <SourceItem
                            name="National Bureau of Statistics (NBS)"
                            url="https://nigerianstat.gov.ng"
                            description="Demographic data, economic indicators, and social statistics."
                        />
                        <SourceItem
                            name="Central Bank of Nigeria (CBN)"
                            url="https://cbn.gov.ng"
                            description="Financial and monetary policy data."
                        />
                    </Section>

                    {/* Civil Society */}
                    <Section title="Civil Society & Partners" icon={Globe}>
                        <SourceItem
                            name="BudgIT"
                            url="https://yourbudgit.com"
                            description="Simplified budget analysis and tracking reports."
                        />
                        <SourceItem
                            name="Code for Africa"
                            url="https://codeforafrica.org"
                            description="Open data initiatives and civic technology support."
                        />
                        <SourceItem
                            name="Connected Development (CODE)"
                            url="https://connecteddevelopment.org"
                            description="Grassroots project tracking and community reports."
                        />
                    </Section>

                    {/* International */}
                    <Section title="International Organizations" icon={FileBarChart}>
                        <SourceItem
                            name="World Bank Open Data"
                            url="https://data.worldbank.org/country/nigeria"
                            description="Development indicators and project funding data."
                        />
                        <SourceItem
                            name="Transparency International"
                            url="https://www.transparency.org"
                            description="Corruption perception indices and global reports."
                        />
                    </Section>
                </div>

                <div className="mt-16 bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-2">Notice an error?</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        If you spot incorrect data or want to suggest a new data source, please let us know.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-green-700 dark:hover:bg-green-500 hover:text-white dark:hover:text-white transition-all shadow-lg"
                    >
                        Report Data Issue
                    </Link>
                </div>

            </main>
        </div>
    );
}

function Section({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <Icon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}

function SourceItem({ name, url, description }: { name: string, url: string, description: string }) {
    return (
        <div className="group">
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-green-600 transition-colors mb-1">
                {name} <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {description}
            </p>
        </div>
    )
}
