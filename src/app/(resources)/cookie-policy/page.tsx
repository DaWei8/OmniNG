"use client";

import React from 'react';

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Cookie <span className="text-green-500">Policy</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        Explanation of how and why we use cookies on this website.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 py-16">
                <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                    <Section title="1. What Are Cookies?">
                        <p>
                            Cookies are small text files that are set on your computer or other devices by websites that you visit. They are widely used in order to make websites work, or work more effectively, as well as to provide information to the owners of the website.
                        </p>
                    </Section>

                    <Section title="2. How We Use Cookies">
                        <p>
                            We use cookies to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Understand and save your preferences for future visits.</li>
                            <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future.</li>
                            <li>Enable certain functions of the Service.</li>
                            <li>Provide analytics.</li>
                        </ul>
                    </Section>

                    <Section title="3. Types of Cookies We Use">
                        <div className="space-y-4">
                            <div>
                                <strong className="block text-zinc-900 dark:text-white mb-1">Essential Cookies</strong>
                                <p>Strictly necessary for the website to function properly.</p>
                            </div>
                            <div>
                                <strong className="block text-zinc-900 dark:text-white mb-1">Analytics Cookies</strong>
                                <p>To help us understand how you use our website, which pages you visit, and to improve our user experience.</p>
                            </div>
                        </div>
                    </Section>

                    <Section title="4. Managing Cookies">
                        <p>
                            Most web browsers refuse cookies by default using the browser settings. You can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.
                        </p>
                    </Section>

                    <Section title="5. Changes to This Cookie Policy">
                        <p>
                            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
                        </p>
                    </Section>
                </div>
            </main>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">{title}</h2>
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {children}
            </div>
        </div>
    )
}
