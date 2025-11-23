'use client';

import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppShellProps {
    children: React.ReactNode;
    currentCategory?: string;
    currentAlgorithm?: string;
}

export function AppShell({ children, currentCategory, currentAlgorithm }: AppShellProps) {
    const showBackButton = !!(currentCategory || currentAlgorithm);
    
    return (
        <div className="min-h-screen bg-[#02040b] text-white">
            <Navbar 
                showBackButton={showBackButton} 
                currentCategory={currentCategory}
                currentAlgorithm={currentAlgorithm}
            />
            <div className="flex">
                <div className="hidden lg:block lg:flex-shrink-0 bg-[#040713]/80 border-r border-white/10">
                    <Sidebar currentCategory={currentCategory} currentAlgorithm={currentAlgorithm} />
                </div>
                <main className="flex-1 overflow-x-hidden pb-32 md:pb-24 lg:pb-0 bg-[#02040b]">
                    {children}
                </main>
            </div>
        </div>
    );
}
