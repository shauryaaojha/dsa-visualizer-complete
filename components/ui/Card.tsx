import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 ${className}`}>
            {children}
        </div>
    );
}
