"use client";

import React, { useState, useEffect, useRef } from 'react';
import nigeria from '@svg-maps/nigeria';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { getStateData, statePosition } from '@/data/nigeriaStates';

interface StateData {
    id: string;
    name: string;
    path: string;
    description: string
}

interface NigeriaMapProps {
    className?: string;
    onStateClick?: (stateId: string) => void;
    disableModal?: boolean;
}

const zoneColors: Record<string, string> = {
    "North West": "#15803d", // orange-700
    "North East": "#16a34a", // yellow-600
    "North Central": "#22c55e", // green-700
    "South West": "#84cc16", // lime-500
    "South East": "#65a30d", // lime-600
    "South South": "#0d9488", // teal-600
};

export default function NigeriaMap({ className, onStateClick, disableModal = false }: NigeriaMapProps) {
    const [selectedState, setSelectedState] = useState<StateData | null>(null);
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [labelPositions, setLabelPositions] = useState<Record<string, { x: number; y: number }>>({});
    const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            const positions: Record<string, { x: number; y: number }> = {};
            let hasUpdates = false;

            Object.entries(pathRefs.current).forEach(([id, element]) => {
                if (element) {
                    try {
                        const bbox = element.getBBox();
                        positions[id] = {
                            x: bbox.x + bbox.width / 2,
                            y: bbox.y + bbox.height / 2
                        };
                        hasUpdates = true;
                    } catch (e) {
                        console.warn("Could not calculate BBox for state:", id);
                    }
                }
            });

            if (hasUpdates) {
                setLabelPositions(positions);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleStateClick = (location: StateData) => {
        if (onStateClick) {
            onStateClick(location.id);
        }
        if (!disableModal) {
            setSelectedState(location);
        }
    };

    return (
        <div className={clsx("w-full max-w-7xl mx-auto gap-10 items-end flex flex-col relative", className)}>

            <div className="relative w-full h-full rounded-3xl">
                <svg
                    viewBox={nigeria.viewBox}
                    className="w-full h-full px-4 xl:px-20 overflow-visible drop-shadow-2xl filter"
                    aria-label="Map of Nigeria"
                >
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    {nigeria.locations.map((location: StateData) => {
                        const stateDetails = getStateData(location.id);
                        const baseColor = zoneColors[stateDetails.zone] || zoneColors["North Central"];

                        return (
                            <motion.path
                                key={location.id}
                                d={location.path}
                                id={location.id}
                                name={location.name}
                                ref={(el) => {
                                    if (el) pathRefs.current[location.id] = el;
                                }}
                                initial={{ fill: baseColor, stroke: "#ffffff", strokeWidth: 1 }}
                                animate={{
                                    fill:
                                        selectedState?.id === location.id
                                            ? "#eab308"
                                            : hoveredState === location.id
                                                ? "#facc15"
                                                : baseColor,
                                    scale: hoveredState === location.id ? 1.02 : 1,
                                    zIndex: hoveredState === location.id ? 10 : 1,
                                    strokeWidth: hoveredState === location.id ? 2 : 1,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="cursor-pointer hover:transform-3d hover:shadow-2xl outline-none"
                                onClick={() => handleStateClick(location)}
                                onMouseEnter={() => setHoveredState(location.id)}
                                onMouseLeave={() => setHoveredState(null)}
                                style={{
                                    transformOrigin: "center",
                                }}
                            />
                        );
                    })}

                    {/* State Labels */}
                    {Object.entries(labelPositions).map(([id, pos]) => {
                        const location = nigeria.locations.find((l: StateData) => l.id === id);
                        const labelPosition = statePosition[id];
                        if (!location) return null;

                        return (
                            <text
                                key={`label-${id}`}
                                x={pos.x}
                                y={pos.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className={`fill-zinc-950 pointer-events-none text-zinc-950 drop-shadow-md ${labelPosition}`}
                                style={{
                                    textShadow: '0px 1px 2px rgba(0,0,0,0.5)',
                                    opacity: 0.9,
                                    fontSize: hoveredState === id ? "12px" : "7px",
                                    fontWeight: hoveredState === id ? "bold" : "normal"
                                }}
                            >
                                {location.name === "Federal Capital Territory" ? "Abuja" : location.name}
                            </text>
                        );
                    })}
                </svg>

                {/* Tooltip for Hover */}
                <AnimatePresence>
                    {hoveredState && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute pointer-events-none z-20 bg-black/80 text-white text-sm px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-xl"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translateX(-30%)",
                            }}
                        >
                            {nigeria.locations.find((l: StateData) => l.id === hoveredState)?.name}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Legend Section */}
            <div className="bg-white xl:absolute bottom-4 right-4 max-w-lg mb-6 dark:bg-zinc-900 rounded-2xl p-3 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-md font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
                    Key to Geopolitical Zones
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(zoneColors).map(([zone, color]) => (
                        <div key={zone} className="flex items-center space-x-1 group cursor-default">
                            <div
                                className="min-w-6 w-6 h-6 rounded-lg shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-sm text-nowrap font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                {zone}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedState && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedState(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-200 dark:border-zinc-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-32 bg-linear-to-br from-green-700 to-teal-700 flex items-center justify-center">
                                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                                    {selectedState.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedState(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                    Discover the beauty and culture of {selectedState.name}.
                                    {` ${getStateData(selectedState.id).description}`}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl">
                                        <span className="block text-xs text-zinc-500 uppercase tracking-wider">Region</span>
                                        <span className="font-medium">{getStateData(selectedState.id).zone}</span>
                                    </div>
                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-xl">
                                        <span className="block text-xs text-zinc-500 uppercase tracking-wider">Status</span>
                                        <span className="font-medium">Active</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/state/${selectedState.id}`}
                                    className="block w-full mt-4 py-3 px-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg active:scale-[0.98] text-center"
                                >
                                    Explore {selectedState.name}
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}