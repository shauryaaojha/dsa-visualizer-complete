import { Card } from '@/components/ui/Card';

interface StateInspectorProps {
    variables: Record<string, number>;
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
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">State Inspector</h2>

            <div className="space-y-4">
                {/* Variables */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Variables</h3>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        {Object.keys(variables).length === 0 ? (
                            <p className="text-sm text-gray-500">No variables to display</p>
                        ) : (
                            Object.entries(variables).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="font-mono text-sm text-gray-700">{key}:</span>
                                    <span className="font-mono text-sm font-semibold text-primary-600">
                                        {value}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Metrics */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Metrics</h3>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Comparisons:</span>
                            <span className="text-sm font-semibold text-gray-900">{comparisons}</span>
                        </div>
                        {swaps > 0 && (
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Swaps:</span>
                                <span className="text-sm font-semibold text-gray-900">{swaps}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Total Steps:</span>
                            <span className="text-sm font-semibold text-gray-900">{totalSteps}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
