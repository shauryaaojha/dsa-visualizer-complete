import { Card } from '@/components/ui/Card';

interface CodePanelProps {
    code: string[];
    currentLine?: number;
}

export function CodePanel({ code, currentLine }: CodePanelProps) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Code</h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                    {code.map((line, index) => {
                        const lineNumber = index + 1;
                        const isActive = currentLine === lineNumber;

                        return (
                            <div
                                key={index}
                                className={`py-1 px-2 -mx-2 rounded transition-colors ${isActive ? 'bg-yellow-500/30 border-l-4 border-yellow-400' : ''
                                    }`}
                            >
                                <span className="text-gray-500 select-none mr-4 inline-block w-6 text-right">
                                    {lineNumber}
                                </span>
                                <span className={isActive ? 'text-yellow-100' : 'text-gray-300'}>
                                    {line}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            </div>
        </Card>
    );
}
