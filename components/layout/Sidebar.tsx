'use client';

import Link from 'next/link';
import { algorithms } from '@/lib/algorithms';
import { moduleStructure } from './moduleStructure';

interface SidebarProps {
    currentCategory?: string;
    currentAlgorithm?: string;
}

export function Sidebar({ currentCategory, currentAlgorithm }: SidebarProps) {
    return (
        <aside className="w-64 min-h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto bg-[#040713]/80 backdrop-blur-xl border-r border-white/5 text-white">
            <div className="p-5 space-y-6">
                <div>
                    <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#7a88b8] mb-2">Modules</h2>
                    <p className="text-sm text-white/80">Browse the entire curriculum</p>
                </div>
                <nav className="space-y-6">
                    {moduleStructure.map((module) => (
                        <div key={module.module}>
                            <div className="mb-2">
                                <div className="text-[11px] font-semibold uppercase text-[#60a5fa]">{module.module}</div>
                                <div className="text-sm font-semibold text-white">{module.title}</div>
                            </div>

                            {module.categories.map((category) => {
                                const categoryAlgos = algorithms[category as keyof typeof algorithms];
                                if (!categoryAlgos) return null;
                                const algoKeys = Object.keys(categoryAlgos);

                                return (
                                    <div key={category} className="ml-1">
                                        <h3 className="text-[11px] font-semibold text-[#7c88b5] mb-1 uppercase tracking-wide">
                                            {category.replace(/-/g, ' ')}
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {algoKeys.map((algoKey) => {
                                                const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos] as any;
                                                const isActive = currentCategory === category && currentAlgorithm === algoKey;

                                                return (
                                                    <li key={algoKey}>
                                                        <Link
                                                            href={`/visualizer/${category}/${algoKey}`}
                                                            className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors touch-target ${isActive
                                                                    ? 'bg-gradient-to-r from-[#1d4ed8]/40 via-[#7c3aed]/40 to-[#c026d3]/40 text-white shadow-inner shadow-[#7c3aed]/30'
                                                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                                                }`}
                                                        >
                                                            {algo.name}
                                                            {algo.exerciseNumber && (
                                                                <span className="ml-1 text-[10px] text-white/50">
                                                                    (Ex.{algo.exerciseNumber})
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
