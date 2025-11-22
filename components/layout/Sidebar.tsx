'use client';

import Link from 'next/link';
import { algorithms } from '@/lib/algorithms';

interface SidebarProps {
    currentCategory?: string;
    currentAlgorithm?: string;
}

export function Sidebar({ currentCategory, currentAlgorithm }: SidebarProps) {
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

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
            <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Course Modules
                </h2>
                <nav className="space-y-6">
                    {moduleStructure.map((module) => (
                        <div key={module.module}>
                            <div className="mb-2">
                                <div className="text-xs font-bold text-primary-600 uppercase">{module.module}</div>
                                <div className="text-sm font-semibold text-gray-700">{module.title}</div>
                            </div>

                            {module.categories.map((category) => {
                                const categoryAlgos = algorithms[category as keyof typeof algorithms];
                                if (!categoryAlgos) return null;
                                const algoKeys = Object.keys(categoryAlgos);

                                return (
                                    <div key={category} className="ml-2">
                                        <h3 className="text-xs font-semibold text-gray-600 mb-1 uppercase">
                                            {category.replace(/-/g, ' ')}
                                        </h3>
                                        <ul className="space-y-1">
                                            {algoKeys.map((algoKey) => {
                                                const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos];
                                                const isActive = currentCategory === category && currentAlgorithm === algoKey;

                                                return (
                                                    <li key={algoKey}>
                                                        <Link
                                                            href={`/visualizer/${category}/${algoKey}`}
                                                            className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${isActive
                                                                    ? 'bg-primary-100 text-primary-700 font-medium'
                                                                    : 'text-gray-700 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            {algo.name}
                                                            {algo.exerciseNumber && (
                                                                <span className="ml-1 text-[10px] text-gray-500">
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
