import { Card } from '@/components/ui/Card';

interface CodePanelProps {
    code: string[];
    currentLine?: number;
}

export function CodePanel({ code, currentLine }: CodePanelProps) {
    return (
        <div>
            <div className="bg-[#050b18] rounded-2xl p-4 overflow-x-auto border border-white/10 shadow-inner shadow-[#000]/40">
                <pre className="text-sm font-mono leading-relaxed text-white/80">
                    {code.map((line, index) => {
                        const lineNumber = index + 1;
                        const isActive = currentLine === lineNumber;

                        return (
                            <div
                                key={index}
                                className={`py-1.5 px-3 -mx-2 rounded-xl transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-[#7c3aed]/30 to-[#c026d3]/30 border-l-4 border-[#c084fc] shadow-lg shadow-[#7c3aed]/20' 
                                        : 'hover:bg-white/5'
                                }`}
                            >
                                <span className="text-white/30 select-none mr-4 inline-block w-8 text-right font-bold text-xs">
                                    {lineNumber}
                                </span>
                                <span className={isActive ? 'text-white font-semibold' : 'text-white/60'}>
                                    {line}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            </div>
        </div>
    );
}
