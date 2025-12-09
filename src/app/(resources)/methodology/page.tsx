"use client";

import React from 'react';
import { Database, CheckCircle, Search, PieChart, ShieldCheck } from 'lucide-react';

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Our <span className="text-green-500">Methodology</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        Transparency starts with us. Here is how we collect, verify, and process the data on this platform.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 py-16">

                <div className="space-y-12 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

                    <Step
                        number="01"
                        title="Data Collection"
                        icon={Search}
                        description="We aggregate data from publicly available government sources (budget office, ministries), international organizations (World Bank, UN), and reputable partner NGOs. We also use automated scrapers for real-time news updates."
                    />

                    <Step
                        number="02"
                        title="Verification & Cleaning"
                        icon={CheckCircle}
                        description="Raw data is messy. Our data team cleans and standardizes datasets to ensure consistency. We cross-reference official claims with independent reports and ground-truthing where possible."
                    />

                    <Step
                        number="03"
                        title="Analysis"
                        icon={PieChart}
                        description="We use statistical models to identify trends, outliers, and anomalies. This helps us flag potential corruption risks or highlight exceptional performance."
                    />

                    <Step
                        number="04"
                        title="Presentation"
                        icon={Database}
                        description="Finally, we visualize the data in user-friendly formats—maps, charts, and scorecards—to make it accessible to every Nigerian citizen, regardless of their technical expertise."
                    />

                    <Step
                        number="05"
                        title="Feedback Loop"
                        icon={ShieldCheck}
                        description="We encourage users to report errors or provide updated information. Verified user submissions are integrated into our database to keep it current."
                    />
                </div>

            </main>
        </div>
    );
}

function Step({ number, title, description, icon: Icon }: { number: string, title: string, description: string, icon: React.ElementType }) {
    return (
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="shrink-0 w-16 h-16 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl z-10 shadow-lg border-4 border-zinc-50 dark:border-black">
                {number}
            </div>
            <div className="flex-1 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-500" />
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {description}
                </p>
            </div>
        </div>
    )
}
