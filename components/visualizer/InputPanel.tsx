import { Card } from '@/components/ui/Card';
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
    onArrayInputChange: (value: string) => void;
    onTargetInputChange: (value: string) => void;
    onOperationChange?: (op: string) => void;
    onOperationValueChange?: (value: string) => void;
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
    onArrayInputChange,
    onTargetInputChange,
    onOperationChange,
    onOperationValueChange,
    onRun,
    onRandomInput,
    onClear,
}: InputPanelProps) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Input</h2>

            <div className="space-y-4">
                {/* Array Input - for most visualizers */}
                {(visualizerKind === 'array' || visualizerKind === 'linked-list') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {visualizerKind === 'array' ? 'Array' : 'Initial Values'} (comma or space separated)
                        </label>
                        <input
                            type="text"
                            value={arrayInput}
                            onChange={(e) => onArrayInputChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g., 10 3 5 1 8"
                        />
                    </div>
                )}

                {/* Target Input - for search algorithms */}
                {needsTarget && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Value
                        </label>
                        <input
                            type="text"
                            value={targetInput}
                            onChange={(e) => onTargetInputChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="e.g., 5"
                        />
                    </div>
                )}

                {/* Operation Selector - for data structures */}
                {operations.length > 0 && onOperationChange && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Operation
                        </label>
                        <select
                            value={operation || operations[0]}
                            onChange={(e) => onOperationChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            {operations.map((op) => (
                                <option key={op} value={op}>
                                    {op.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Operation Value - for insert/search operations */}
                {operation && (operation.includes('insert') || operation.includes('search') || operation === 'push') && onOperationValueChange && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Value
                        </label>
                        <input
                            type="number"
                            value={operationValue || ''}
                            onChange={(e) => onOperationValueChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter value"
                        />
                    </div>
                )}

                {/* Graph Input - for graph algorithms */}
                {visualizerKind === 'graph' && (
                    <div>
                        <div className="text-sm text-gray-600 mb-2">
                            Using default graph. Future updates will allow custom graph input.
                        </div>
                    </div>
                )}

                {/* Stack/Queue specific - show stack operations */}
                {(visualizerKind === 'stack' || visualizerKind === 'queue') && (
                    <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-xs font-semibold text-gray-700 mb-1">Default Operations:</div>
                        <div className="text-xs text-gray-600">
                            The visualizer will run a sequence of operations. Use the playback controls to step through each operation.
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button onClick={onRun} className="flex-1">
                        Run
                    </Button>
                    {visualizerKind === 'array' && (
                        <Button onClick={onRandomInput} variant="outline">
                            Random
                        </Button>
                    )}
                    <Button onClick={onClear} variant="ghost">
                        Clear
                    </Button>
                </div>

                {/* Help Text */}
                <div className="text-xs text-gray-500 mt-2">
                    {visualizerKind === 'array' && 'Enter numbers separated by spaces or commas'}
                    {visualizerKind === 'linked-list' && 'Initial values for the linked list'}
                    {visualizerKind === 'stack' && 'Stack operations will be demonstrated'}
                    {visualizerKind === 'queue' && 'Queue operations will be demonstrated'}
                    {visualizerKind === 'tree' && 'Tree operations on a sample BST'}
                    {visualizerKind === 'graph' && 'Graph traversal on a sample graph'}
                </div>
            </div>
        </Card>
    );
}
