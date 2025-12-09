"use client";

import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Privacy <span className="text-green-500">Policy</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        How we handle your data and protect your privacy.
                    </p>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-5 py-16">
                <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                    <Section title="1. Introduction">
                        <p>
                            At OmniNG, we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@omni-ng.ng.
                        </p>
                    </Section>

                    <Section title="2. Information We Collect">
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                        </p>
                        <p className="mt-4">
                            The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use.
                        </p>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you marketing and promotional communications.</li>
                            <li>To send administrative information to you.</li>
                            <li>To requesting feedback.</li>
                            <li>To protect our Services.</li>
                        </ul>
                    </Section>

                    <Section title="4. Sharing Your Information">
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>
                    </Section>

                    <Section title="5. Security of Your Information">
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
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
