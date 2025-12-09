"use client";

import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Terms of <span className="text-green-500">Service</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        The rules and regulations for using the OmniNG platform.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 py-16">
                <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                    <Section title="1. Agreement to Terms">
                        <p>
                            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and OmniNG (“Company”, “we”, “us”, or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                        </p>
                    </Section>

                    <Section title="2. Intellectual Property Rights">
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </Section>

                    <Section title="3. User Representations">
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside.
                        </p>
                    </Section>

                    <Section title="4. Prohibited Activities">
                        <p>
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>
                    </Section>

                    <Section title="5. Modifications and Interruptions">
                        <p>
                            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
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
