import { Card } from '@/components/ui/Card';

interface ExplanationPanelProps {
    message: string;
}

export function ExplanationPanel({ message }: ExplanationPanelProps) {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Explanation</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">{message}</p>
            </div>
        </Card>
    );
}
