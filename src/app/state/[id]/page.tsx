"use client";

import { useParams, useRouter } from 'next/navigation';
import nigeria from '@svg-maps/nigeria';
import { ArrowLeft, MapPin, Info, Users, Building, TrendingUp, Briefcase, Home, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStateData, StateDetails } from '@/data/nigeriaStates';

interface StateShapeData {
    id: string;
    name: string;
    path: string;
}

export default function StatePage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    // Find the state shape data
    const stateShape = nigeria.locations.find((loc: StateShapeData) => loc.id === id);

    // Get the detailed data
    const stateData: StateDetails = getStateData(id as string);

    // Merge name from shape if available (usually more accurate for display)
    const displayName = stateShape?.name || stateData.name;

    if (!stateShape) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">State Not Found</h1>
                    <button
                        onClick={() => router.back()}
                        className="text-blue-500 hover:underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const MetricCard = ({ title, value, subLabel }: { title: string, value: string, subLabel?: string }) => (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-colors">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{title}</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm md:text-base">{value}</p>
            {subLabel && <p className="text-xs text-zinc-400 mt-1">{subLabel}</p>}
        </div>
    );

    const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="flex items-center gap-2 mb-4 mt-8 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{title}</h3>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white font-sans">
            {/* Header Image / Banner */}
            <div className="relative h-64 md:h-80 bg-linear-to-r from-green-700 to-green-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-lg text-center px-4">
                        {displayName}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl mt-2 font-medium italic">"{stateData.slogan}"</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all group"
                >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                    <div className="p-6 md:p-10">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Left Column: Shape & Key Stats */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                                <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-8 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                                    <svg
                                        viewBox={nigeria.viewBox}
                                        className="w-full h-full relative drop-shadow-lg text-green-700 dark:text-green-700 fill-current"
                                    >
                                        <path d={stateShape.path} className='absolute top-1/2 left-1/2 scale-200' stroke="none" />
                                    </svg>
                                </div>

                                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-700">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <Info className="w-5 h-5" /> Key Facts
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                                            <span className="text-zinc-500">Capital</span>
                                            <span className="font-medium">{stateData.capital}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                                            <span className="text-zinc-500">Population</span>
                                            <span className="font-medium">{stateData.population}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                                            <span className="text-zinc-500">LGAs</span>
                                            <span className="font-medium">{stateData.localGovernments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Detailed Metrics */}
                            <div className="w-full lg:w-2/3">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold mb-4">Overview</h2>
                                    <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                                        {stateData.description}
                                    </p>
                                </div>

                                {/* Economic Health */}
                                <SectionHeader icon={TrendingUp} title="Economic Health & Stability" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <MetricCard title="GDP Growth" value={stateData.economics.gdpGrowthRate} />
                                    <MetricCard title="Unemployment" value={stateData.economics.unemploymentRate} />
                                    <MetricCard title="Median Income" value={stateData.economics.medianHouseholdIncome} />
                                    <MetricCard title="Gini Coefficient" value={stateData.economics.giniCoefficient} />
                                    <MetricCard title="Tax/GDP" value={stateData.economics.taxToGDPRatio} />
                                    <MetricCard title="Poverty Rate" value={stateData.economics.povertyHeadcount} />
                                </div>

                                {/* Career & Employment */}
                                <SectionHeader icon={Briefcase} title="Career & Employment" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <MetricCard title="Job Creation" value={stateData.career.jobCreationSector} />
                                    <MetricCard title="Industry Conc." value={stateData.career.industryConcentration} />
                                    <MetricCard title="Wage Growth" value={stateData.career.averageWageGrowth} />
                                    <MetricCard title="Labor Force" value={stateData.career.laborForceParticipation} />
                                    <MetricCard title="Digital Econ" value={stateData.career.digitalEconomyShare} />
                                    <MetricCard title="Youth Unemp." value={stateData.career.youthUnemployment} />
                                </div>

                                {/* Housing */}
                                <SectionHeader icon={Home} title="Housing & Cost of Living" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <MetricCard title="Affordability" value={stateData.housing.affordabilityRatio} />
                                    <MetricCard title="Rent/Income" value={stateData.housing.rentToIncomeRatio} />
                                    <MetricCard title="Inflation (CPI)" value={stateData.housing.cpiInflation} />
                                    <MetricCard title="Property Tax" value={stateData.housing.propertyTaxRate} />
                                    <MetricCard title="Home Appr." value={stateData.housing.homePriceAppreciation} />
                                    <MetricCard title="Price Var." value={stateData.housing.regionalPriceVariation} />
                                </div>

                                {/* Infrastructure */}
                                <SectionHeader icon={Truck} title="Infrastructure & Connectivity" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <MetricCard title="Road Condition" value={stateData.infrastructure.federalRoadCondition} />
                                    <MetricCard title="Commute Time" value={stateData.infrastructure.averageCommuteTime} />
                                    <MetricCard title="Broadband" value={stateData.infrastructure.broadbandPenetration} />
                                    <MetricCard title="Port Traffic" value={stateData.infrastructure.portContainerTraffic} />
                                    <MetricCard title="Electricity" value={stateData.infrastructure.electricityAccess} />
                                </div>

                                {/* Business & Safety */}
                                <div>
                                    <SectionHeader icon={Building} title="Business Environment" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <MetricCard title="New Biz" value={stateData.business.newBusinessRegistrations} />
                                        <MetricCard title="Start Time" value={stateData.business.timeToStartBusiness} />
                                        <MetricCard title="VC Funding" value={stateData.business.ventureCapitalFunding} />
                                        <MetricCard title="Tariffs" value={stateData.business.importTariffBurden} />
                                    </div>
                                </div>
                                <div>
                                    <SectionHeader icon={ShieldCheck} title="Safety & Fiscal" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <MetricCard title="Violent Crime" value={stateData.safety.violentCrimeRate} />
                                        <MetricCard title="Credit Rating" value={stateData.safety.sovereignCreditRating} />
                                        <MetricCard title="Public Service" value={stateData.safety.publicServiceIndex} />
                                    </div>
                                </div>

                                {/* Latest Developments */}
                                {stateData.developments && stateData.developments.length > 0 && (
                                    <div>
                                        <SectionHeader icon={TrendingUp} title="Latest Developments" />
                                        <div className="grid gap-4">
                                            {stateData.developments.map((dev) => (
                                                <div key={dev.id} className="bg-white dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700/50 hover:border-blue-500/30 transition-all group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${dev.type === 'Project' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                                dev.type === 'News' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                                    'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                                                                }`}>
                                                                {dev.type}
                                                            </span>
                                                            <span className="text-xs text-zinc-500">{dev.date}</span>
                                                        </div>
                                                        {dev.status && (
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${dev.status === 'Ongoing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                                dev.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                                    'bg-zinc-100 text-zinc-600'
                                                                }`}>
                                                                {dev.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {dev.title}
                                                    </h4>
                                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                                        {dev.summary}
                                                    </p>
                                                    {dev.link && (
                                                        <a href={dev.link} className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:text-blue-500 underline decoration-blue-500/30 hover:decoration-blue-500">
                                                            Read more
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
