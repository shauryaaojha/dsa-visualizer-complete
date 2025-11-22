import { memo } from 'react';
import { Card } from '../ui/Card';

interface AnalyticsConsoleProps {
    events: Array<{
        timestamp: Date;
        type: 'step' | 'action' | 'error';
        message: string;
        data?: any;
    }>;
    onClear?: () => void;
}

export const AnalyticsConsole = memo(function AnalyticsConsole({ events, onClear }: AnalyticsConsoleProps) {
    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Analytics Console</h3>
                {onClear && (
                    <button
                        onClick={onClear}
                        className="text-xs px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                        aria-label="Clear analytics"
                    >
                        Clear
                    </button>
                )}
            </div>
            <div 
                className="bg-gray-900 text-gray-100 rounded text-xs font-mono p-2 max-h-48 overflow-y-auto"
                role="log"
                aria-live="polite"
                aria-label="Analytics log"
            >
                {events.length === 0 ? (
                    <div className="text-gray-500">No events logged yet...</div>
                ) : (
                    events.slice(-20).map((event, i) => (
                        <div key={i} className="mb-1">
                            <span className="text-gray-500">[{event.timestamp.toLocaleTimeString()}]</span>
                            <span className={`ml-2 ${
                                event.type === 'error' ? 'text-red-400' : 
                                event.type === 'step' ? 'text-blue-400' : 
                                'text-green-400'
                            }`}>
                                {event.type.toUpperCase()}
                            </span>
                            <span className="ml-2">{event.message}</span>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
});
