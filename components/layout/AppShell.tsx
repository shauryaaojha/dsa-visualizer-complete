'use client';

import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppShellProps {
    children: React.ReactNode;
    currentCategory?: string;
    currentAlgorithm?: string;
}

export function AppShell({ children, currentCategory, currentAlgorithm }: AppShellProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar currentCategory={currentCategory} currentAlgorithm={currentAlgorithm} />
                <main className="flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
