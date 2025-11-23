import { Button } from '@/components/ui/Button';
import { VisualizerKind } from '@/lib/algorithms/types';

interface InputPanelProps {
    visualizerKind: VisualizerKind;
    arrayInput: string;
    targetInput: string;
    operation?: string;
    operationValue?: string;
    needsTarget: boolean;
    errorMessage: string;
    operations?: string[];
    isLoading?: boolean;
    onArrayInputChange: (value: string) => void;
    onTargetInputChange: (value: string) => void;
    onOperationChange?: (op: string) => void;
    onOperationValueChange?: (value: string) => void;
    customInputLabel?: string;
    customInputPlaceholder?: string;
    customInputHelperText?: string;
    customInputValue?: string;
    onCustomInputChange?: (value: string) => void;
    onRun: () => void;
    onRandomInput: () => void;
    onClear: () => void;
}

export function InputPanel({
    visualizerKind,
    arrayInput,
    targetInput,
    operation,
    operationValue,
    needsTarget,
    errorMessage,
    operations = [],
    isLoading = false,
    onArrayInputChange,
    onTargetInputChange,
    onOperationChange,
    onOperationValueChange,
    customInputLabel,
    customInputPlaceholder,
    customInputHelperText,
    customInputValue,
    onCustomInputChange,
    onRun,
    onRandomInput,
    onClear,
}: InputPanelProps) {
    return (
        <div className="space-y-4">
            {/* Array Input - for most visualizers */}
            {(visualizerKind === 'array' || visualizerKind === 'linked-list') && (
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                        {visualizerKind === 'array' ? 'Array' : 'Initial Values'}
                    </label>
                    <input
                        type="text"
                        value={arrayInput}
                        onChange={(e) => onArrayInputChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#050b17]/90 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="e.g., 10 3 5 1 8"
                        disabled={isLoading}
                    />
                </div>
            )}

            {/* Custom expression/text input */}
            {customInputLabel && onCustomInputChange && (
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                        {customInputLabel}
                    </label>
                    <textarea
                        value={customInputValue || ''}
                        onChange={(e) => onCustomInputChange(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#050b17]/90 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#22c55e] transition-colors"
                        placeholder={customInputPlaceholder || ''}
                        disabled={isLoading}
                    />
                    {customInputHelperText && (
                        <p className="text-xs text-white/50 mt-1">{customInputHelperText}</p>
                    )}
                </div>
            )}

            {/* Target Input */}
            {needsTarget && (
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                        Target Value
                    </label>
                    <input
                        type="text"
                        value={targetInput}
                        onChange={(e) => onTargetInputChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#050b17]/90 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="e.g., 5"
                        disabled={isLoading}
                    />
                </div>
            )}

            {/* Operation Selector */}
            {operations.length > 0 && onOperationChange && (
                <div>
                    <label htmlFor="operation-select" className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                        Operation
                    </label>
                    <select
                        id="operation-select"
                        value={operation || operations[0]}
                        onChange={(e) => onOperationChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#050b17]/90 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        aria-label="Select operation"
                    >
                        {operations.map((op) => (
                            <option key={op} value={op}>
                                {op.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Operation Value */}
            {operation && (operation.includes('insert') || operation.includes('search') || operation === 'push') && onOperationValueChange && (
                <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                        Value
                    </label>
                    <input
                        type="text"
                        value={operationValue}
                        onChange={(e) => onOperationValueChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-[#050b17]/90 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all"
                        placeholder="Enter value"
                        disabled={isLoading}
                    />
                </div>
            )}

            {/* Graph Input */}
            {visualizerKind === 'graph' && (
                <div className="bg-gradient-to-r from-[#1d4ed8]/30 to-[#7c3aed]/30 border border-white/10 p-4 rounded-2xl">
                    <div className="text-sm text-white">
                        Using default graph. Future updates will allow custom graph input.
                    </div>
                </div>
            )}

            {/* Stack/Queue specific */}
            {(visualizerKind === 'stack' || visualizerKind === 'queue') && (
                <div className="bg-gradient-to-r from-[#7c3aed]/20 to-[#c026d3]/20 border border-white/10 p-4 rounded-2xl">
                    <div className="text-xs font-semibold text-white mb-1 tracking-wide uppercase">Default Operations:</div>
                    <div className="text-xs text-white/80">
                        The visualizer will run a sequence of operations. Use the playback controls to step through each operation.
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                    <p className="text-sm text-red-200">{errorMessage}</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button 
                    onClick={onRun} 
                    className="w-full sm:flex-1 h-12 bg-[#22c55e] hover:bg-[#16a34a] text-[#04170b] font-semibold rounded-2xl shadow-[0_20px_40px_rgba(34,197,94,0.25)] text-base sm:text-sm" 
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⟳</span>
                            Running...
                        </span>
                    ) : (
                        'Run'
                    )}
                </Button>
                {visualizerKind === 'array' && (
                    <Button 
                        onClick={onRandomInput} 
                        variant="outline" 
                        className="w-full sm:w-auto sm:flex-1 h-12 bg-white/5 hover:bg-white/10 text-white border-white/10 font-medium rounded-2xl"
                        disabled={isLoading}
                    >
                        Random
                    </Button>
                )}
                <Button 
                    onClick={onClear} 
                    variant="ghost" 
                    className="w-full sm:w-auto sm:flex-none h-12 text-white/50 hover:text-white hover:bg-white/5 font-medium rounded-2xl"
                    disabled={isLoading}
                >
                    Clear
                </Button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-white/50 mt-2">
                {visualizerKind === 'array' && 'Enter numbers separated by spaces or commas'}
                {visualizerKind === 'linked-list' && 'Initial values for the linked list'}
                {visualizerKind === 'stack' && 'Stack operations will be demonstrated'}
                {visualizerKind === 'queue' && 'Queue operations will be demonstrated'}
                {visualizerKind === 'tree' && 'Tree operations on a sample BST'}
                {visualizerKind === 'graph' && 'Graph traversal on a sample graph'}
            </div>
        </div>
    );
}
