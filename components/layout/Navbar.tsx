'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BackButton } from '@/components/ui/BackButton';
import { algorithms } from '@/lib/algorithms';
import { moduleStructure } from './moduleStructure';

interface NavbarProps {
    showBackButton?: boolean;
    currentCategory?: string;
    currentAlgorithm?: string;
    showAlgorithmMenu?: boolean;
}

const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/visualizer', label: 'Visualizer' },
    { href: '/curriculum', label: 'Curriculum' },
];

export function Navbar({ showBackButton = false, currentCategory, currentAlgorithm, showAlgorithmMenu = true }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const normalizedPath = pathname?.split('?')[0] ?? '';
    const isVisualizerActive = normalizedPath.startsWith('/visualizer') || Boolean(currentCategory || currentAlgorithm);

    return (
        <nav className="sticky top-0 z-40 bg-[#05060f]/95 border-b border-white/10 backdrop-blur-2xl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        {showBackButton && (
                            <div className="hidden md:block">
                                <BackButton />
                            </div>
                        )}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1d4ed8] via-[#7c3aed] to-[#c026d3] flex items-center justify-center text-white shadow-lg shadow-[#7c3aed]/40">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <p className="text-lg font-semibold text-white">AlgoCoach</p>
                        </Link>
                        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold pl-6 ml-2 border-l border-white/10">
                            {navLinks.map(({ href, label }) => {
                                const isActive = href === '/'
                                    ? normalizedPath === '/'
                                    : href.startsWith('/visualizer')
                                        ? isVisualizerActive
                                        : normalizedPath.startsWith('/curriculum');
                                return (
                                    <Link
                                        key={href + label}
                                        href={href}
                                        className={`relative text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                                    >
                                        {label}
                                        {isActive && <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-[#22c55e] to-[#4ade80]"></span>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Search modules</span>
                        </div>

                        {showAlgorithmMenu && (
                            <AlgorithmMenuTrigger
                                currentCategory={currentCategory}
                                currentAlgorithm={currentAlgorithm}
                                className="hidden md:inline-flex"
                            />
                        )}

                        <Link
                            href="/visualizer"
                            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-[#22c55e] text-[#05210c] font-semibold shadow-[0_15px_35px_rgba(34,197,94,0.35)] hover:translate-y-0.5 transition-transform"
                        >
                            Dashboard
                        </Link>

                        <div className="hidden sm:flex w-11 h-11 rounded-full border border-white/15 bg-white/5 text-white items-center justify-center">
                            <span className="text-lg">🧠</span>
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            {showAlgorithmMenu && (
                                <AlgorithmMenuTrigger
                                    currentCategory={currentCategory}
                                    currentAlgorithm={currentAlgorithm}
                                    className="inline-flex md:hidden"
                                    size="sm"
                                    label="Algorithms"
                                />
                            )}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg border border-white/15 text-white"
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-white/10 py-4 space-y-3">
                        {navLinks.map(({ href, label }) => {
                            const isActive = href === '/'
                                ? normalizedPath === '/'
                                : href.startsWith('/visualizer')
                                    ? isVisualizerActive
                                    : normalizedPath.startsWith('/curriculum');

                            return (
                                <Link
                                    key={`mobile-${href}`}
                                    href={href}
                                    className={`block px-4 py-3 rounded-xl bg-white/5 ${isActive ? 'text-white' : 'text-white/70'} hover:text-white`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <div className="px-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-sm text-white/70">
                                <span>🔍</span>
                                <span>Search modules</span>
                            </div>
                        </div>
                        <Link
                            href="/visualizer"
                            className="block mx-4 px-5 py-3 rounded-2xl bg-[#22c55e] text-[#05210c] text-center font-semibold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

interface AlgorithmTriggerProps {
    currentCategory?: string;
    currentAlgorithm?: string;
    className?: string;
    size?: 'sm' | 'md';
    label?: string;
}

function AlgorithmMenuTrigger({ currentCategory, currentAlgorithm, className = '', size = 'md', label = 'Browse Algorithms' }: AlgorithmTriggerProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (category: string, algoKey: string) => {
        setOpen(false);
        router.push(`/visualizer/${category}/${algoKey}`);
    };

    const sizeClasses = size === 'sm'
        ? 'px-3 py-1.5 text-xs rounded-full'
        : 'px-4 py-2 text-sm rounded-full';

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`inline-flex items-center gap-2 border border-white/15 bg-white/5 text-white font-medium ${sizeClasses} hover:bg-white/10 transition-colors ${className}`}
                aria-haspopup="dialog"
            >
                <span>📚</span>
                <span>{label}</span>
            </button>
            {open && (
                <div className="fixed inset-0 z-50 bg-black/70 flex flex-col md:bg-transparent md:block">
                    <div className="absolute inset-0" onClick={() => setOpen(false)} aria-hidden="true" />
                    <div className="relative z-10 flex-1 w-full md:h-auto md:flex-none md:block">
                        <div className="flex h-[calc(100vh-4rem)] md:h-full w-full flex-col bg-[#050710] border-t border-white/10 md:border md:w-[720px] md:rounded-3xl md:absolute md:top-16 md:left-1/2 md:-translate-x-1/2 p-5 overflow-y-auto overscroll-contain touch-pan-y">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-lg font-semibold text-white">Browse algorithms</p>
                                <p className="text-xs text-white/60">Jump to any module instantly</p>
                            </div>
                            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-sm">Close</button>
                        </div>
                        {moduleStructure.map((module) => (
                            <div key={module.module} className="mb-5">
                                <div className="mb-2">
                                    <div className="text-[11px] font-semibold uppercase text-[#60a5fa] tracking-[0.2em]">{module.module}</div>
                                    <div className="text-sm font-semibold text-white">{module.title}</div>
                                </div>
                                {module.categories.map((category) => {
                                    const categoryAlgos = algorithms[category as keyof typeof algorithms];
                                    if (!categoryAlgos) return null;
                                    const algoKeys = Object.keys(categoryAlgos);

                                    return (
                                        <div key={category} className="mt-3 space-y-1">
                                            <p className="text-[11px] uppercase text-white/50">{category.replace(/-/g, ' ')}</p>
                                            {algoKeys.map((algoKey) => {
                                                const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos] as any;
                                                const isActive = currentCategory === category && currentAlgorithm === algoKey;

                                                return (
                                                    <button
                                                        key={algoKey}
                                                        onClick={() => handleNavigate(category, algoKey)}
                                                        className={`w-full text-left px-4 py-2 rounded-2xl border text-sm font-medium transition-colors ${isActive
                                                                ? 'border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]'
                                                                : 'border-white/10 text-white/80 hover:border-white/40 hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {algo.name}
                                                        {algo.exerciseNumber && (
                                                            <span className="ml-1 text-xs text-white/40">(Ex.{algo.exerciseNumber})</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
