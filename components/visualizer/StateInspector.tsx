interface StateInspectorProps {
    variables: Record<string, number | string>;
    comparisons: number;
    swaps: number;
    currentStep: number;
    totalSteps: number;
}

export function StateInspector({
    variables,
    comparisons,
    swaps,
    currentStep,
    totalSteps,
}: StateInspectorProps) {
    return (
        <div className="space-y-3">
            {/* Variables */}
            <div>
                <h3 className="text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-[0.3em]">Variables</h3>
                <div className="bg-[#050b18] text-white rounded-2xl p-4 space-y-2 border border-white/10 shadow-inner">
                    {Object.keys(variables).length === 0 ? (
                        <p className="text-sm text-white/50">No variables to display</p>
                    ) : (
                        Object.entries(variables).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="font-mono text-sm text-[#a5b4fc]">{key}:</span>
                                <span className="font-mono text-sm font-bold text-white">
                                    {value}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Metrics */}
            <div>
                <h3 className="text-[11px] font-semibold text-white/50 mb-2 uppercase tracking-[0.3em]">Metrics</h3>
                <div className="bg-[#050b18] text-white rounded-2xl p-4 space-y-2 border border-white/10 shadow-inner">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">Comparisons:</span>
                        <span className="text-sm font-bold text-[#60a5fa]">{comparisons}</span>
                    </div>
                    {swaps > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/60">Swaps:</span>
                            <span className="text-sm font-bold text-[#f472b6]">{swaps}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">Total Steps:</span>
                        <span className="text-sm font-bold text-[#c084fc]">{totalSteps}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
