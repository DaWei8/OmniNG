"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Activity, Users, Map as MapIcon } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

type TabType = 'officials' | 'ideas' | 'states' | 'achievements';

const COLORS = {
    forest: '#1B4332',
    earth: '#D4A574',
    terracotta: '#A0522D',
    charcoal: '#2D3748',
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32'
};

const officials = [
    { rank: 1, name: 'Babagana Zulum', position: 'Governor', state: 'Borno', party: 'APC', rating: 4.3, promises: '72/90', projects: 15, performance: 86, image: null },
    { rank: 2, name: 'Charles Soludo', position: 'Governor', state: 'Anambra', party: 'APGA', rating: 4.5, promises: '65/80', projects: 12, performance: 81, image: null },
    { rank: 3, name: 'Babajide Sanwo-Olu', position: 'Governor', state: 'Lagos', party: 'APC', rating: 4.2, promises: '78/95', projects: 18, performance: 78, image: null },
    { rank: 4, name: 'Alex Otti', position: 'Governor', state: 'Abia', party: 'LP', rating: 4.1, promises: '52/70', projects: 8 },
    { rank: 5, name: 'Ahmadu Umaru Fintiri', position: 'Governor', state: 'Adamawa', party: 'PDP', rating: 3.9, promises: '58/85', projects: 12 },
    { rank: 6, name: 'Umo Eno', position: 'Governor', state: 'Akwa Ibom', party: 'PDP', rating: 4.0, promises: '41/65', projects: 9 },
    { rank: 7, name: 'Bala Mohammed', position: 'Governor', state: 'Bauchi', party: 'PDP', rating: 3.7, promises: '49/75', projects: 11 },
    { rank: 8, name: 'Douye Diri', position: 'Governor', state: 'Bayelsa', party: 'PDP', rating: 3.6, promises: '38/55', projects: 7 },
    { rank: 9, name: 'Hyacinth Alia', position: 'Governor', state: 'Benue', party: 'APC', rating: 3.8, promises: '44/70', projects: 6 },
    { rank: 10, name: 'Godswill Akpabio', position: 'Senate President', state: 'Akwa Ibom', party: 'APC', rating: 3.8, promises: '45/60', projects: 5 }
];

const ideas = [
    { rank: 1, title: 'Solar Street Lighting Initiative', author: 'Lagos Community', state: 'Lagos', votes: 1247, status: 'Implemented', impact: '15 communities', progress: 100 },
    { rank: 2, title: 'Mobile Learning Centers', author: 'Kano State', state: 'Kano', votes: 892, status: 'In Progress', impact: '25 villages', progress: 65 },
    { rank: 3, title: 'Community Health Insurance', author: 'Anambra State', state: 'Anambra', votes: 634, status: 'Under Review', impact: '50,000 people', progress: 25 },
    { rank: 4, title: 'Digital Skills Training Centers in Rural Areas', author: 'Adebayo Oluwaseun', state: 'Oyo', category: 'Education', votes: 245, status: 'Under Review' },
    { rank: 5, title: 'Solar-Powered Irrigation Systems for Small Farmers', author: 'Fatima Abdullahi', state: 'Kano', category: 'Agriculture', votes: 189, status: 'In Progress' },
    { rank: 6, title: 'Waste-to-Energy Community Plants', author: 'Emeka Okafor', state: 'Lagos', category: 'Environment', votes: 178, status: 'Implemented' },
    { rank: 7, title: 'Youth Entrepreneurship Hubs', author: 'Amina Yusuf', state: 'Kaduna', category: 'Youth Empowerment', votes: 267, status: 'In Progress' },
    { rank: 8, title: 'Mobile Medical Clinics for Remote Areas', author: 'Dr. Ibrahim Suleiman', state: 'Borno', category: 'Healthcare', votes: 198, status: 'Under Review' },
    { rank: 9, title: 'Community Water Conservation Program', author: 'Grace Johnson', state: 'Plateau', category: 'Environment', votes: 156, status: 'Implemented' },
    { rank: 10, title: 'Women Cooperative Farming Initiative', author: 'Mariam Ahmed', state: 'Katsina', category: 'Agriculture', votes: 234, status: 'In Progress' }
];

const RankBadge = ({ rank }: { rank: number }) => {
    let style = { background: `linear-gradient(135deg, ${COLORS.forest}, ${COLORS.charcoal})` };

    if (rank === 1) style = { background: `linear-gradient(135deg, ${COLORS.gold}, #FFA500)` };
    if (rank === 2) style = { background: `linear-gradient(135deg, ${COLORS.silver}, #A8A8A8)` };
    if (rank === 3) style = { background: `linear-gradient(135deg, ${COLORS.bronze}, #B8860B)` };

    return (
        <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md shrink-0"
            style={style}
        >
            {rank}
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const isImplemented = status === 'Implemented';
    const isInProgress = status === 'In Progress';

    const colorClass = isImplemented ? 'text-green-600' : isInProgress ? 'text-blue-600' : 'text-yellow-600';

    return (
        <span className={clsx("font-medium text-sm", colorClass)}>
            {status} {isImplemented && '✓'}
        </span>
    );
}

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('officials');

    const renderOfficials = () => (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-6">
                <h2 className="text-3xl font-bold mb-8 text-[#1B4332] dark:text-green-400 font-serif">Top Performers</h2>
                {officials.slice(0, 3).map((official) => {
                    const bgClass = official.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' :
                        official.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200' :
                            'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={official.rank}
                            className={clsx("p-6 rounded-lg border", bgClass)}
                        >
                            <div className="flex items-center mb-4">
                                <RankBadge rank={official.rank} />
                                <div className="ml-4 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-300 object-cover overflow-hidden">
                                        <div className="w-full h-full bg-zinc-400 flex items-center justify-center text-white text-xl">
                                            {official.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1B4332]">{official.name}</h3>
                                        <p className="text-sm text-gray-600">{official.position}, {official.state}</p>
                                        <span className={clsx("inline-block px-2 py-1 rounded-full text-xs mt-1",
                                            official.party === 'APC' ? "bg-green-100 text-green-800" :
                                                official.party === 'PDP' ? "bg-red-100 text-red-800" :
                                                    official.party === 'APGA' ? "bg-purple-100 text-purple-800" :
                                                        "bg-gray-100 text-gray-800"
                                        )}>{official.party}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Rating:</span>
                                    <span className="font-medium">{official.rating}/5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Promises Kept:</span>
                                    <span className="font-medium">{official.promises}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Projects:</span>
                                    <span className="font-medium">{official.projects} Completed</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{
                                            width: `${official.performance}%`,
                                            background: `linear-gradient(90deg, ${COLORS.forest}, ${COLORS.earth})`
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{official.performance}% Performance Score</div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Complete Rankings List */}
            <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-[#1B4332] dark:text-green-400 font-serif">Complete Rankings</h2>
                    <div className="flex space-x-2">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none">
                            <option value="all">All Positions</option>
                            <option value="governors">Governors</option>
                            <option value="senators">Senators</option>
                            <option value="house-reps">House of Reps</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none">
                            <option value="all">All Parties</option>
                            <option value="APC">APC</option>
                            <option value="PDP">PDP</option>
                            <option value="LP">LP</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {officials.slice(3).map((official) => (
                        <div key={official.rank} className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center space-x-4 transition-all hover:translate-x-2 hover:shadow-lg">
                            <RankBadge rank={official.rank} />
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 mt-4 sm:mt-0">
                                <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">{official.name.charAt(0)}</div>
                            </div>
                            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                                <h3 className="font-semibold text-[#1B4332] dark:text-green-400">{official.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{official.position} • {official.state}</p>
                                <span className={clsx("inline-block px-2 py-1 rounded-full text-xs mt-1",
                                    official.party === 'APC' ? "bg-green-100 text-green-800" :
                                        official.party === 'PDP' ? "bg-red-100 text-red-800" :
                                            "bg-gray-100 text-gray-800"
                                )}>{official.party}</span>
                            </div>
                            <div className="text-right mt-4 sm:mt-0 w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:items-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                                <div>
                                    <div className="font-bold text-lg text-[#1B4332] dark:text-green-400">{official.rating}/5</div>
                                    <div className="text-xs text-gray-500">Rating</div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-xs text-gray-500">{official.promises} promises</div>
                                    <div className="text-xs text-gray-500">{official.projects} projects</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderIdeas = () => (
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Top Ideas */}
            <div className="lg:col-span-1 space-y-6">
                <h2 className="text-3xl font-bold mb-8 text-[#1B4332] dark:text-green-400 font-serif">Top Community Ideas</h2>
                {ideas.slice(0, 3).map((idea) => {
                    const bgClass = idea.rank === 1 ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' :
                        idea.rank === 2 ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200' :
                            'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200';
                    const progressColor = idea.rank === 1 ? 'bg-green-500' : idea.rank === 2 ? 'bg-blue-500' : 'bg-yellow-500';

                    return (
                        <div key={idea.rank} className={clsx("p-6 rounded-lg border", bgClass)}>
                            <div className="flex items-center mb-4">
                                <RankBadge rank={idea.rank} />
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold text-[#1B4332] text-sm">{idea.title}</h3>
                                    <p className="text-xs text-gray-600">{idea.state}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Votes:</span>
                                    <span className="font-medium">{idea.votes}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <StatusBadge status={idea.status!} />
                                </div>
                                <div className="flex justify-between">
                                    <span>Impact:</span>
                                    <span className="font-medium">{idea.impact}</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div className={`h-1 rounded-full ${progressColor}`} style={{ width: `${idea.progress}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{idea.progress}% Implementation</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* All Ideas */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-[#1B4332] dark:text-green-400 font-serif">All Community Ideas</h2>
                    <div className="flex space-x-2">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B4332] outline-none">
                            <option value="all">All Categories</option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Education">Education</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B4332] outline-none">
                            <option value="all">All Status</option>
                            <option value="Implemented">Implemented</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {ideas.slice(3).map((idea) => (
                        <div key={idea.rank} className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center space-x-4">
                            <RankBadge rank={idea.rank} />
                            <div className="flex-1">
                                <h3 className="font-semibold text-[#1B4332] dark:text-green-400">{idea.title}</h3>
                                <div className="flex gap-2 text-xs text-gray-600 mt-1">
                                    <span>{idea.author}</span>
                                    <span>• {idea.state}</span>
                                    <span>• {idea.category}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <StatusBadge status={idea.status || ''} />
                                <div className="text-xs text-gray-500 mt-1">{idea.votes} Votes</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStates = () => (
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
                <h3 className="font-semibold text-[#1B4332] dark:text-green-400 mb-6 text-xl">Top Performing States</h3>
                {/* Simplified Chart Visual */}
                <div className="h-96 bg-gray-50 dark:bg-zinc-900 rounded-lg flex items-end justify-around p-4 border border-gray-200">
                    {[85, 78, 65, 55, 40].map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-12">
                            <div className="w-full bg-[#1B4332] rounded-t-sm relative group cursor-pointer hover:opacity-90 transition-all" style={{ height: `${h * 3}px` }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                            </div>
                            <span className="text-xs text-gray-500 rotate-45 mt-2 origin-left">State {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-[#1B4332] dark:text-green-400 mb-6 text-xl">State Rankings</h3>
                <div className="space-y-4">
                    {[
                        { rank: 1, name: 'Lagos', score: 85, trend: 'up' },
                        { rank: 2, name: 'Rivers', score: 70, trend: 'stable' },
                        { rank: 3, name: 'Edo', score: 60, trend: 'up' },
                        { rank: 4, name: 'Borno', score: 50, trend: 'down' },
                        { rank: 5, name: 'Kano', score: 45, trend: 'stable' },
                    ].map((state) => (
                        <div key={state.rank} className="bg-white dark:bg-zinc-900 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-400 w-6">#{state.rank}</span>
                                <span className="font-bold text-[#1B4332] dark:text-green-400">{state.name}</span>
                            </div>
                            <span className="font-bold text-[#D4A574]">{state.score}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAchievements = () => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gov of Year */}
            <div className="bg-linear-to-br from-yellow-50 to-yellow-100 border border-yellow-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-yellow-800">Governor of the Year</h3>
                <p className="text-sm text-yellow-600 mb-4">2024</p>

                <div className="text-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2" />
                    <p className="font-medium text-[#1B4332]">Babagana Zulum</p>
                    <p className="text-sm text-gray-600">Borno State</p>
                </div>
                <p className="text-yellow-700 text-sm mt-4">
                    For exceptional leadership in reconstruction and humanitarian efforts
                </p>
            </div>

            {/* Innovative */}
            <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-green-800">Most Innovative Leader</h3>
                <p className="text-sm text-green-600 mb-4">2024</p>

                <div className="text-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2" />
                    <p className="font-medium text-[#1B4332]">Charles Soludo</p>
                    <p className="text-sm text-gray-600">Anambra State</p>
                </div>
                <p className="text-green-700 text-sm mt-4">
                    For pioneering digital transformation in governance
                </p>
            </div>

            {/* Community Choice */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-blue-800">Community Choice Award</h3>
                <p className="text-sm text-blue-600 mb-4">2024</p>

                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center text-blue-600 font-bold">S</div>
                    <p className="font-medium text-[#1B4332]">Solar Street Lighting</p>
                    <p className="text-sm text-gray-600">Lagos Community</p>
                </div>
                <p className="text-blue-700 text-sm mt-4">
                    Most voted community solution with 1,247 citizen votes
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans pb-20">
            {/* Navigation Bar Mock (Optional, assuming layout handles this but visual consistency) */}

            {/* Hero Section */}
            <section
                className="pt-24 pb-16 relative"
                style={{
                    background: `linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(160, 82, 45, 0.9))`
                }}
            >
                {/* We don't have the image resource, so the gradient serves as the main bg */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl font-bold mb-6 font-serif">Performance Rankings</h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                        Discover Nigeria's top performing political leaders and most impactful community solutions.
                        Rankings based on citizen ratings, achievement metrics, and community impact.
                    </p>
                    <div className="flex justify-center space-x-4">
                        {[
                            { val: '469', label: 'Leaders Ranked' },
                            { val: '2,847', label: 'Ideas Ranked' },
                            { val: '15,632', label: 'Citizen Votes' }
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[140px]">
                                <div className="text-2xl font-bold">{stat.val}</div>
                                <div className="text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'officials', label: 'Political Leaders' },
                            { id: 'ideas', label: 'Community Ideas' },
                            { id: 'states', label: 'State Rankings' },
                            { id: 'achievements', label: 'Achievements' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={clsx(
                                    "px-6 py-4 font-medium border-b-[3px] transition-all whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "border-[#1B4332] text-[#1B4332] bg-[#1B4332]/10 dark:text-green-400 dark:border-green-400 dark:bg-green-400/10"
                                        : "border-transparent text-gray-600 hover:text-[#1B4332] dark:text-gray-400 dark:hover:text-green-300"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'officials' && renderOfficials()}
                        {activeTab === 'ideas' && renderIdeas()}
                        {activeTab === 'states' && renderStates()}
                        {activeTab === 'achievements' && renderAchievements()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer Mock to match visual layout if needed, but keeping it inside main app layout is better usually */}
        </div>
    );
}
