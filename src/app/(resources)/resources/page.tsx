"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, BookOpen, Video, Users, ArrowRight } from 'lucide-react';


export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Citizen <span className="text-green-500">Resources</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        Tools, guides, and educational materials to help you understand your rights and hold power accountable.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-5 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ResourceCard
                        title="Constitution of Nigeria"
                        description="Download the complete 1999 Constitution (as amended) in PDF format."
                        icon={BookOpen}
                        action="Download JSON/PDF"
                    />
                    <ResourceCard
                        title="FOI Act Guide"
                        description="Step-by-step guide on how to file a Freedom of Information request."
                        icon={FileText}
                        action="Read Guide"
                    />
                    <ResourceCard
                        title="Civic Tech Tools"
                        description="A directory of apps and websites for reporting issues and tracking projects."
                        icon={ExternalLink}
                        action="View Directory"
                    />
                    <ResourceCard
                        title="Educational Videos"
                        description="Watch explainers on how the budget process works and how to track funds."
                        icon={Video}
                        action="Watch Now"
                    />
                    <ResourceCard
                        title="Community Organizing"
                        description="Playbook for organizing your local community for advocacy."
                        icon={Users}
                        action="Get Playbook"
                    />
                </div>
            </main>
        </div>
    );
}

function ResourceCard({ title, description, icon: Icon, action }: { title: string, description: string, icon: React.ElementType, action: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-green-500/30 transition-all group"
        >
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-green-700 dark:text-green-500 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                {description}
            </p>
            <div className="flex items-center text-green-700 dark:text-green-400 font-bold text-sm group-hover:gap-2 transition-all">
                {action} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
        </motion.div>
    )
}
