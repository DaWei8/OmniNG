import { notFound } from 'next/navigation';
import { ArrowLeft, Globe, MapPin, Calendar, ExternalLink, Leaf, GraduationCap, HeartPulse, Truck, Wallet, Briefcase, Zap, Lightbulb, CheckCircle, Tag } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { getSolutionById, getSolutions } from '@/actions/solutions';

interface PageProps {
    params: Promise<{ id: string }>;
}

const sectorIcons: Record<string, React.ElementType> = {
    'Fintech': Wallet,
    'Agriculture': Leaf,
    'Healthcare': HeartPulse,
    'Education': GraduationCap,
    'Clean Energy': Zap,
    'Civic Tech': Lightbulb,
    'Logistics': Truck,
    'Infrastructure': Briefcase
};

export default async function SolutionDetailPage({ params }: PageProps) {
    const { id } = await params;
    const solution = await getSolutionById(id);

    if (!solution) {
        notFound();
    }

    const SolutionIcon = sectorIcons[solution.sector] || Briefcase;

    // Fetch all solutions to find similar ones (could be optimized later)
    const allSolutions = await getSolutions("All");
    const similarSolutions = allSolutions
        .filter(s => s.sector === solution.sector && s.id !== solution.id) // Ensure ID check
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            {/* Nav Back Header */}
            <div className="sticky top-16 z-40 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/solutions" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-green-700 dark:hover:text-green-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Solutions
                    </Link>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Logo / Icon Placeholder */}
                        <div className={clsx(
                            "w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shrink-0",
                            solution.type === 'NGO' ? "bg-orange-500" :
                                solution.type === 'Business' ? "bg-blue-600" : "bg-purple-600"
                        )}>
                            {solution.name.charAt(0)}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5",
                                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                )}>
                                    <SolutionIcon className="w-3.5 h-3.5" />
                                    {solution.sector}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                                    {solution.type}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 dark:text-white leading-tight">
                                {solution.name}
                            </h1>

                            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed max-w-3xl">
                                {solution.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-green-700" />
                                    {solution.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-700" />
                                    Est. {solution.foundedYear}
                                </div>
                                <a href={solution.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-700 hover:underline">
                                    <Globe className="w-4 h-4" />
                                    {solution.website.replace('https://', '')}
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-0">
                            <a
                                href={solution.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-green-800 dark:hover:bg-green-800 hover:text-white dark:hover:text-white transition-colors shadow-lg"
                            >
                                Visit Website
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: Problem & Impact */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Problem Statement */}
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-8 border border-red-100 dark:border-red-900/20">
                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6" />
                                The Problem
                            </h2>
                            <p className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                                {solution.problemSolved}
                            </p>
                        </div>

                        {/* Impact Metrics */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/20">
                            <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6" />
                                Impact to Date
                            </h2>
                            {solution.impactMetrics && solution.impactMetrics.length > 0 ? (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {solution.impactMetrics.map((metric, idx) => (
                                        <div key={idx} className="bg-white/60 dark:bg-black/20 p-4 rounded-2xl flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span className="font-bold text-zinc-800 dark:text-zinc-100">{metric}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-500 italic">No specific impact metrics listed yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Similar */}
                    <div className="space-y-6">
                        <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-gray-500" />
                                Organisation Details
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold mb-1">Type</div>
                                    <div className="font-medium">{solution.type}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold mb-1">Sector</div>
                                    <div className="font-medium">{solution.sector}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold mb-1">Headquarters</div>
                                    <div className="font-medium">{solution.location}</div>
                                </div>
                            </div>
                        </div>

                        {similarSolutions.length > 0 && (
                            <div>
                                <h3 className="font-bold text-zinc-500 mb-4 px-2">Similar Solutions</h3>
                                <div className="flex flex-col gap-3">
                                    {similarSolutions.map(sim => (
                                        <Link href={`/solutions/${sim.id}`} key={sim.id} className="block p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-green-500 transition-all">
                                            <div className="font-bold mb-1">{sim.name}</div>
                                            <div className="text-xs text-zinc-500 line-clamp-2">{sim.description}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
