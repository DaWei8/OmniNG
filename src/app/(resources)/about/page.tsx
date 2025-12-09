import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Flag, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        About <span className="text-green-500">Us</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        We are building the digital infrastructure for a more transparent, accountable, and participatory Nigeria.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 py-16">

                {/* Mission */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                    </div>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Democratic Accountability operates on a simple premise: democracy requires informed participation. In a country as vast and complex as Nigeria, accessing reliable information about governance, public spending, and official responsibilities can be challenging. We exist to bridge that gap, providing citizens with the tools they need to track performance, ask the right questions, and demand better governance.
                    </p>
                </section>

                {/* Values */}
                <section className="grid md:grid-cols-2 gap-8 mb-20">
                    <ValueCard
                        icon={Shield}
                        title="Integrity"
                        description="We are non-partisan and data-driven. Our loyalty is to the truth and to the Nigerian people."
                    />
                    <ValueCard
                        icon={Users}
                        title="Inclusivity"
                        description="We believe every Nigerian voice matters, regardless of region, religion, or social status."
                    />
                    <ValueCard
                        icon={Flag}
                        title="Patriotism"
                        description="Our work is driven by a deep love for our country and a belief in its potential."
                    />
                    <ValueCard
                        icon={Heart}
                        title="Empathy"
                        description="We understand the real-world impact of governance on daily lives and strive to represent that reality."
                    />
                </section>

                {/* Team Placeholder */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Who We Are</h2>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl text-center border border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            We are a diverse team of data scientists, policy analysts, software engineers, and community organizers passionate about civic technology.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

function ValueCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Icon className="w-8 h-8 text-green-600 dark:text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
