"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { officialsData } from '@/data/officialsData';
import {
    ArrowLeft, MapPin, Building2, Phone, Mail,
    Award, BookOpen, Wallet, CheckCircle, Star, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

interface PageProps {
    params: Promise<{ name: string }>;
}

export default function OfficialDetailPage({ params }: PageProps) {
    const { name } = use(params);
    const officialId = parseInt(name);
    const official = officialsData.find((o) => o.id === officialId);

    if (!official) {
        notFound();
    }

    const sortedOfficials = [...officialsData].sort((a, b) => b.rating - a.rating);
    const overallRank = sortedOfficials.findIndex(o => o.id === officialId) + 1;

    const roleOfficials = officialsData.filter(o => o.role === official.role).sort((a, b) => b.rating - a.rating);
    const roleRank = roleOfficials.findIndex(o => o.id === officialId) + 1;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/officials" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Officials
                    </Link>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Image */}
                    <div className="w-full md:w-64 h-64 md:h-80 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 relative">
                        {/* {official.image ? (
                            <Image
                                src={official.image}
                                alt={official.name}
                                fill
                                className="object-cover"
                            />
                        ) : ( */}
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-6xl font-bold text-zinc-400">{official.name.charAt(0)}</span>
                        </div>

                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-zinc-200 dark:border-zinc-800">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold">{official.rating || "N/A"}</span>
                            <span className="text-xs text-zinc-500">Rating</span>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-4">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
                                    {official.role}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-white leading-tight">
                                    {official.name}
                                </h1>
                                <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400">
                                    {official.position || `${official.role} • ${official.state}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center min-w-[80px]">
                                    <span className="block text-xs font-bold text-zinc-500 uppercase">Party</span>
                                    <span className="text-xl font-bold">{official.party}</span>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-center min-w-[80px]">
                                    <span className="block text-xs font-bold text-orange-700 dark:text-orange-400 uppercase">Rank (All)</span>
                                    <span className="text-xl font-bold text-orange-700 dark:text-orange-400">#{overallRank}</span>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center min-w-[80px]">
                                    <span className="block text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Rank ({official.role === 'Governor' ? 'Gov' : official.role})</span>
                                    <span className="text-xl font-bold text-blue-700 dark:text-blue-400">#{roleRank}</span>
                                </div>
                            </div>
                        </div>

                        {official.description && (
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 max-w-3xl border-l-4 border-zinc-200 dark:border-zinc-700 pl-4 py-1">
                                {official.description}
                            </p>
                        )}

                        {/* Key Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-3 border border-green-100 dark:border-green-900/20 text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-500">{official.promises.kept}</div>
                                <div className="text-xs font-medium text-green-800 dark:text-green-300">Promises Kept</div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-3 border border-red-100 dark:border-red-900/20 text-center">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-500">{official.promises.broken}</div>
                                <div className="text-xs font-medium text-red-800 dark:text-red-300">Promises Broken</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3 border border-blue-100 dark:border-blue-900/20 text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">{official.promises.pending}</div>
                                <div className="text-xs font-medium text-blue-800 dark:text-blue-300">Promises Pending</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact & Personal Info */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-green-600" />
                                Contact Details
                            </h3>
                            <div className="space-y-4 text-sm">
                                {official.contact?.email && (
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <Mail className="w-4 h-4 shrink-0 opacity-50" />
                                        <a href={`mailto:${official.contact.email}`} className="hover:text-green-600 break-all">{official.contact.email}</a>
                                    </div>
                                )}
                                {official.contact?.phone && (
                                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <Phone className="w-4 h-4 shrink-0 opacity-50" />
                                        <span>{official.contact.phone}</span>
                                    </div>
                                )}
                                {official.residence && (
                                    <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                                        <Building2 className="w-4 h-4 shrink-0 opacity-50 mt-1" />
                                        <span>{official.residence}</span>
                                    </div>
                                )}
                                {official.contact?.officeAddress && (
                                    <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                                        <MapPin className="w-4 h-4 shrink-0 opacity-50 mt-1" />
                                        <span>{official.contact.officeAddress}</span>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-4">
                                    {official.contact?.twitter && (
                                        <a href={`https://twitter.com/${official.contact.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:text-green-600 transition-colors">
                                            <FaTwitter className="w-4 h-4" />
                                        </a>
                                    )}
                                    {official.contact?.facebook && (
                                        <a href={`https://facebook.com/${official.contact.facebook}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:text-green-600 transition-colors">
                                            <FaFacebook className="w-4 h-4" />
                                        </a>
                                    )}
                                    {official.contact?.instagram && (
                                        <a href={`https://instagram.com/${official.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:text-green-600 transition-colors">
                                            <FaInstagram className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Financials Estimate */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-green-600" />
                                Financial Profile
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">Estimated Net Worth</div>
                                    <div className="text-xl font-mono font-bold text-zinc-900 dark:text-white">
                                        {official.financials?.estimatedNetWorth || "Not Publicly Available"}
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="text-xs text-zinc-500 mb-1">Est. Government Allowance</div>
                                    <div className="text-base font-mono font-medium text-zinc-700 dark:text-zinc-300">
                                        {official.financials?.allowances || "Standard Official Scale"}
                                    </div>
                                </div>
                                <div className="text-[10px] text-zinc-400 italic mt-2">
                                    * Figures are estimates based on public records and declarations.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Manifesto & Achievements */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Manifesto */}
                        {official.manifesto && (
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-green-600" />
                                    Campaign Manifesto
                                </h3>
                                <h4 className="text-lg font-bold text-zinc-800 dark:text-white mb-2">{official.manifesto.title}</h4>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-6">{official.manifesto.summary}</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {official.manifesto.points.map((point, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                            <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Achievements */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6 text-green-600" />
                                Official Achievements
                            </h3>

                            {official.achievements && official.achievements.length > 0 ? (
                                <div className="space-y-4">
                                    {official.achievements.map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                        >
                                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 shrink-0">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-zinc-900 dark:text-white">{achievement}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-zinc-500">
                                    <p>No achievements logged yet for the current tenure.</p>
                                </div>
                            )}
                        </div>

                        {/* Track Record / Stats (Visual Placeholder) */}
                        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6" />
                                    Performance Scorecard
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div>
                                        <div className="text-4xl font-black mb-1">{(Math.random() * 80 + 10).toFixed(0)}%</div>
                                        <div className="text-sm text-green-100 font-medium">Session Attendance</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black mb-1">{(Math.random() * 40 + 5).toFixed(0)}</div>
                                        <div className="text-sm text-green-100 font-medium">Bills Sponsored</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black mb-1">{(Math.random() * 20 + 2).toFixed(0)}</div>
                                        <div className="text-sm text-green-100 font-medium">Townhalls Held</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-black mb-1">{(Math.random() * 100).toFixed(0)}</div>
                                        <div className="text-sm text-green-100 font-medium">Projects Commissioned</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
