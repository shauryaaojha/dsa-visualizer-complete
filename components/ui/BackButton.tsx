'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function BackButton({ className = '' }: { className?: string }) {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            variant="ghost"
            className={`flex items-center gap-2 ${className}`}
            aria-label="Go back"
        >
            <span className="text-lg">←</span>
            <span>Back</span>
        </Button>
    );
}
