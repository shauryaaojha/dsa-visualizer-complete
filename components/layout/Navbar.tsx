'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/lib/hooks/useTheme';

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme, mounted } = useTheme();

    return (
        <nav className="border-b bg-white dark:bg-slate-900 dark:border-slate-700 sticky top-0 z-20 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                        DSA Visualizer
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors touch-target"
                        >
                            Home
                        </Link>
                        <Link
                            href="/visualizer"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors touch-target"
                        >
                            Visualizer
                        </Link>
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors touch-target"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors touch-target"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors touch-target"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t dark:border-slate-700">
                        <Link
                            href="/"
                            className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/visualizer"
                            className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-target"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Visualizer
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
