'use client';

import Link from 'next/link';
import { useState } from 'react';
import { algorithms } from '@/lib/algorithms';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

interface SidebarProps {
    currentCategory?: string;
    currentAlgorithm?: string;
}

export function Sidebar({ currentCategory, currentAlgorithm }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Organize by modules
    const moduleStructure = [
        {
            module: 'Module 1',
            title: 'Algorithms Basics',
            categories: ['sorting', 'searching'],
        },
        {
            module: 'Module 2',
            title: 'Lists & Arrays',
            categories: ['linked-lists'],
        },
        {
            module: 'Module 3',
            title: 'Stacks & Queues',
            categories: ['stacks-queues'],
        },
        {
            module: 'Module 4',
            title: 'Trees & BST',
            categories: ['trees'],
        },
        {
            module: 'Module 5',
            title: 'Graph Algorithms',
            categories: ['graphs'],
        },
    ];

    const sidebarContent = (
        <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Course Modules
            </h2>
            <nav className="space-y-6">
                {moduleStructure.map((module) => (
                    <div key={module.module}>
                        <div className="mb-2">
                            <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">{module.module}</div>
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{module.title}</div>
                        </div>

                        {module.categories.map((category) => {
                            const categoryAlgos = algorithms[category as keyof typeof algorithms];
                            if (!categoryAlgos) return null;
                            const algoKeys = Object.keys(categoryAlgos);

                            return (
                                <div key={category} className="ml-2">
                                    <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 uppercase">
                                        {category.replace(/-/g, ' ')}
                                    </h3>
                                    <ul className="space-y-1">
                                        {algoKeys.map((algoKey) => {
                                            const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos] as any;
                                            const isActive = currentCategory === category && currentAlgorithm === algoKey;

                                            return (
                                                <li key={algoKey}>
                                                    <Link
                                                        href={`/visualizer/${category}/${algoKey}`}
                                                        className={`block px-3 py-2 rounded-md text-xs transition-colors touch-target ${isActive
                                                                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                                            }`}
                                                        onClick={() => isMobile && setIsOpen(false)}
                                                    >
                                                        {algo.name}
                                                        {algo.exerciseNumber && (
                                                            <span className="ml-1 text-[10px] text-gray-500 dark:text-gray-400">
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
    );

    if (isMobile) {
        return (
            <>
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed bottom-4 left-4 z-30 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all touch-target"
                    aria-label="Toggle sidebar"
                    aria-expanded={isOpen}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Overlay */}
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-20"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />
                        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 z-20 overflow-y-auto animate-slide-in">
                            {sidebarContent}
                        </aside>
                    </>
                )}
            </>
        );
    }

    // Desktop Sidebar
    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 min-h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
            {sidebarContent}
        </aside>
    );
}
