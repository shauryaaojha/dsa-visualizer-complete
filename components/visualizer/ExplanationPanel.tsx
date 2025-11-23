interface ExplanationPanelProps {
    message: string;
}

export function ExplanationPanel({ message }: ExplanationPanelProps) {
    return (
        <div className="bg-gradient-to-r from-[#101a34] via-[#1f0f3c] to-[#05050d] border border-white/10 rounded-3xl p-5 shadow-inner">
            <p className="text-white/80 leading-relaxed text-sm font-medium">{message}</p>
        </div>
    );
}
