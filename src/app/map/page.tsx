"use client";

import React, { useState, useMemo } from 'react';
import NigeriaMap from '@/components/NigeriaMap';
import { getStateData, StateDetails } from '@/data/nigeriaStates';
import { Info, Plus, X, BarChart2, Scale, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';

type MetricCategory = 'All' | 'Economics' | 'Career' | 'Housing' | 'Infrastructure' | 'Business' | 'Safety';

const categories: MetricCategory[] = ['All', 'Economics', 'Career', 'Housing', 'Infrastructure', 'Business', 'Safety'];

export default function MapPage() {
    const [selectedMetric, setSelectedMetric] = useState<MetricCategory>('All');
    const [viewedStateId, setViewedStateId] = useState<string | null>(null);
    const [comparisonList, setComparisonList] = useState<string[]>([]);

    const viewedState = viewedStateId ? getStateData(viewedStateId) : null;

    const handleStateClick = (id: string) => {
        setViewedStateId(id);
        const detailSection = document.getElementById('state-detail-section');
        if (detailSection && window.innerWidth < 768) {
            detailSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const addToComparison = (id: string) => {
        if (comparisonList.includes(id)) return;
        if (comparisonList.length >= 2) {
            setComparisonList([comparisonList[0], id]);
        } else {
            setComparisonList([...comparisonList, id]);
        }
    };

    const removeFromComparison = (id: string) => {
        setComparisonList(comparisonList.filter(cId => cId !== id));
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pb-20">
            <div className="relative bg-zinc-950 pt-20 pb-14 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-blue-950/50" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-700/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl xl:max-w-7xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">
                        Interactive Data Map
                    </h1>
                    <p className="text-xl mb-4 text-zinc-400 max-w-2xl">
                        Select a state to view details or compare metrics.
                    </p>
                    <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
                        <span className="text-sm text-white font-medium whitespace-nowrap hidden md:inline-block">Track:</span>
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedMetric(cat)}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all",
                                        selectedMetric === cat
                                            ? "bg-green-700 text-white shadow-lg"
                                            : "bg-zinc-100/30 dark:bg-zinc-800 text-white hover:text-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl xl:max-w-7xl mx-auto px-4 py-8">
                {/* Map Section */}
                <section className=" p-4 md:p-8 mb-8">
                    <NigeriaMap
                        className="w-full h-[50vh] md:h-[60vh]"
                        onStateClick={handleStateClick}
                        disableModal={true}
                    />
                    <div className="mt-4 flex justify-between items-center text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            <span>Click on any state to view aggregated data.</span>
                        </div>
                        <div>
                            Source: NBS, CBN, State Budget Offices (2024 Est.)
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-8" id="state-detail-section">
                    {/* Selected State Detail */}
                    <AnimatePresence mode="wait">
                        {viewedState ? (
                            <motion.div
                                key={viewedState.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm h-fit"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-1">{viewedState.name} State</h2>
                                        <p className="text-zinc-500 text-sm">{viewedState.slogan}</p>
                                    </div>
                                    <button
                                        onClick={() => addToComparison(viewedState.id)}
                                        disabled={comparisonList.includes(viewedState.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {comparisonList.includes(viewedState.id) ? 'Added' : 'Compare'}
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div className="text-xs text-zinc-500 uppercase">Zone</div>
                                            <div className="font-semibold">{viewedState.zone}</div>
                                        </div>
                                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                                            <div className="text-xs text-zinc-500 uppercase">Population</div>
                                            <div className="font-semibold">{viewedState.population}</div>
                                        </div>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400">
                                        <p>{viewedState.description}</p>
                                    </div>
                                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <BarChart2 className="w-4 h-4" />
                                            Key Metrics (Estimates)
                                        </h3>
                                        <div className="space-y-3">
                                            {/* Show a few top metrics */}
                                            <MetricRow label="GDP Growth" value={viewedState.economics.gdpGrowthRate} />
                                            <MetricRow label="Unemployment" value={viewedState.economics.unemploymentRate} />
                                            <MetricRow label="Violent Crime Rate" value={viewedState.safety.violentCrimeRate} />
                                            <MetricRow label="Internal Generated Revenue (Ratio)" value={viewedState.economics.taxToGDPRatio} />
                                        </div>
                                    </div>

                                    <Link href={`/state/${viewedState.id}`} className="block w-full text-center py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors mt-4">
                                        View Full State Report
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                    <Info className="w-8 h-8 text-zinc-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No State Selected</h3>
                                <p className="text-zinc-500 max-w-xs">Select a state on the map to view detailed analytics and add to comparison.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Comparison Module */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-bold">Compare</h3>
                            <span className="text-sm text-zinc-500">{comparisonList.length}/2 States</span>
                        </div>

                        {comparisonList.length > 0 ? (
                            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                                <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                                    <div className="p-4 text-xs font-bold uppercase text-zinc-500 flex items-center">Metric</div>
                                    {comparisonList.map(id => {
                                        const state = getStateData(id);
                                        return (
                                            <div key={id} className="p-4 relative group">
                                                <div className="font-bold truncate pr-6">{state.name}</div>
                                                <button
                                                    onClick={() => removeFromComparison(id)}
                                                    className="absolute top-1/2 -translate-y-1/2 right-2 p-1 text-zinc-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )
                                    })}
                                    {/* Fill empty slot if only 1 selected */}
                                    {comparisonList.length === 1 && (
                                        <div className="p-4 text-zinc-400 text-sm italic flex items-center justify-center border-l border-dashed border-zinc-200 dark:border-zinc-800">
                                            Select another
                                        </div>
                                    )}
                                </div>

                                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    <ComparisonRows
                                        ids={comparisonList}
                                        category={selectedMetric}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <Scale className="w-12 h-12 text-zinc-300 mb-4" />
                                <p className="text-zinc-500">Add states to compare their metrics side-by-side.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-20 p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl flex gap-4 items-start">
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0" />
                    <div>
                        <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Data Disclaimer</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                            The figures presented on this platform are estimates aggregated from various public sources including the National Bureau of Statistics (NBS), Central Bank of Nigeria (CBN), and various international development agencies. While we strive for accuracy, these figures should be used for informational purposes only. We strongly advise conducting independent research before making any financial, investment, or political decisions based on this data. Sourcing attribution is provided where available.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function MetricRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-zinc-50 dark:border-zinc-800/50 last:border-0">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
            <span className="font-medium text-sm">{value}</span>
        </div>
    );
}

function ComparisonRows({ ids, category }: { ids: string[], category: MetricCategory }) {
    if (ids.length === 0) return null;

    const data1 = getStateData(ids[0]);
    const data2 = ids[1] ? getStateData(ids[1]) : null;

    const renderMetricObject = (key: keyof StateDetails, title: string) => {
        let metrics: { label: string, key: string }[] = [];

        if (key === 'economics') {
            metrics = [
                { label: 'GDP Growth', key: 'gdpGrowthRate' },
                { label: 'Unemployment', key: 'unemploymentRate' },
                { label: 'Household Income', key: 'medianHouseholdIncome' },
                { label: 'Gini Coeff.', key: 'giniCoefficient' },
                { label: 'Tax/GDP', key: 'taxToGDPRatio' },
                { label: 'Poverty', key: 'povertyHeadcount' },
            ];
        } else if (key === 'career') {
            metrics = [
                { label: 'Top Sector', key: 'jobCreationSector' },
                { label: 'Avg Wage Growth', key: 'averageWageGrowth' },
                { label: 'Labor Participation', key: 'laborForceParticipation' },
                { label: 'Youth Unemployment', key: 'youthUnemployment' },
            ];
        } else if (key === 'housing') {
            metrics = [
                { label: 'Affordability', key: 'affordabilityRatio' },
                { label: 'Rent/Income', key: 'rentToIncomeRatio' },
                { label: 'Inflation', key: 'cpiInflation' },
                { label: 'Home Appreciation', key: 'homePriceAppreciation' },
            ];
        } else if (key === 'infrastructure') {
            metrics = [
                { label: 'Road Condition', key: 'federalRoadCondition' },
                { label: 'Commute Time', key: 'averageCommuteTime' },
                { label: 'Broadband', key: 'broadbandPenetration' },
                { label: 'Electricity', key: 'electricityAccess' },
            ];
        } else if (key === 'business') {
            metrics = [
                { label: 'New Registrations', key: 'newBusinessRegistrations' },
                { label: 'Time to Start', key: 'timeToStartBusiness' },
                { label: 'VC Funding', key: 'ventureCapitalFunding' },
            ];
        } else if (key === 'safety') {
            metrics = [
                { label: 'Violent Crime', key: 'violentCrimeRate' },
                { label: 'Credit Rating', key: 'sovereignCreditRating' },
                { label: 'Public Service', key: 'publicServiceIndex' },
            ];
        }

        return (
            <>
                <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold uppercase text-zinc-500 tracking-wider">
                    {title}
                </div>
                {metrics.map(m => (
                    <div key={m.key} className="grid grid-cols-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <div className="p-4 text-sm text-zinc-600 dark:text-zinc-400 border-r border-zinc-100 dark:border-zinc-800">
                            {m.label}
                        </div>
                        <div className="p-4 text-sm font-medium border-r border-zinc-100 dark:border-zinc-800">
                            {/* @ts-ignore */}
                            {data1[key][m.key]}
                        </div>
                        <div className="p-4 text-sm font-medium">
                            {/* @ts-ignore */}
                            {data2 ? data2[key][m.key] : '-'}
                        </div>
                    </div>
                ))}
            </>
        )
    };

    return (
        <>
            {(category === 'All' || category === 'Economics') && renderMetricObject('economics', 'Economics')}
            {(category === 'All' || category === 'Business') && renderMetricObject('business', 'Business Environment')}
            {(category === 'All' || category === 'Infrastructure') && renderMetricObject('infrastructure', 'Infrastructure')}
            {(category === 'All' || category === 'Safety') && renderMetricObject('safety', 'Safety & Governance')}
            {(category === 'All' || category === 'Housing') && renderMetricObject('housing', 'Housing')}
            {(category === 'All' || category === 'Career') && renderMetricObject('career', 'Labor & Career')}
        </>
    );
}