"use client";

import React from 'react';
import { Download, Image as ImageIcon, FileText, Mail } from 'lucide-react';

export default function PressKitPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Header */}
            <div className="relative bg-zinc-950 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl px-5 mx-auto relative z-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Press <span className="text-green-500">Kit</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                        Assets, brand guidelines, and resources for journalists and media partners.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-5 py-16">

                <div className="grid md:grid-cols-2 gap-10 mb-16">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <ImageIcon className="w-10 h-10 text-green-600 mb-6" />
                        <h2 className="text-2xl font-bold mb-4">Logos & Assets</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                            High-resolution versions of our logo in various formats (PNG, SVG, EPS) for light and dark backgrounds.
                        </p>
                        <div className="space-y-4">
                            <AssetRow label="Logomark (Symbol Only)" size="2 MB" />
                            <AssetRow label="Full Logo (Horizontal)" size="4 MB" />
                            <AssetRow label="Full Logo (Vertical)" size="4 MB" />
                        </div>
                        <button className="mt-8 w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download All Assets (ZIP)
                        </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <FileText className="w-10 h-10 text-blue-600 mb-6" />
                        <h2 className="text-2xl font-bold mb-4">Brand Guidelines</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                            Instructions on how to use our brand elements, including color palettes, typography, and spacing.
                        </p>
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center mb-8">
                            <div className="inline-block w-12 h-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
                            <p className="text-sm font-bold">Brand_Guidelines_v1.0.pdf</p>
                        </div>
                        <button className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download Guidelines
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-3xl p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
                        <p className="text-zinc-400 max-w-xl mb-8 text-lg">
                            For interview requests, official statements, or partnership opportunities, please contact our media team.
                        </p>
                        <a href="mailto:press@democratica.ng" className="text-2xl font-bold hover:text-green-400 transition-colors pb-1 border-b-2 border-green-500 hover:border-green-400">
                            press@omni-ng.ng
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
}

function AssetRow({ label, size }: { label: string, size: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <span className="font-medium">{label}</span>
            <span className="text-xs font-bold px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-600 dark:text-zinc-300">{size}</span>
        </div>
    )
}
