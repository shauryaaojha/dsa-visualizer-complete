import { Button } from '@/components/ui/Button';

interface PlaybackControlsProps {
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    speed: number;
    onReset: () => void;
    onPrevious: () => void;
    onPlayPause: () => void;
    onNext: () => void;
    onSpeedChange: (speed: number) => void;
}

export function PlaybackControls({
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    onReset,
    onPrevious,
    onPlayPause,
    onNext,
    onSpeedChange,
}: PlaybackControlsProps) {
    const hasSteps = totalSteps > 0;

    return (
        <div className="space-y-4">
            {/* Progress with Step Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-base sm:text-sm">
                        Step {hasSteps ? currentStep + 1 : 0} / {totalSteps}
                    </span>
                    {hasSteps && (
                        <span className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/10">
                            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                        </span>
                    )}
                </div>
                <span className="text-white/60 font-medium">
                    Speed: {speed.toFixed(2).replace(/\.00$/, '')}x
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 border border-white/10 rounded-full h-3 relative overflow-hidden">
                <div
                    className={`bg-gradient-to-r from-[#22c55e] to-[#4ade80] h-3 rounded-full transition-all duration-200 absolute inset-0 origin-left`}
                    style={{ 
                        transform: hasSteps ? `scaleX(${((currentStep + 1) / totalSteps)})` : 'scaleX(0)'
                    }}
                />
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
                <Button
                    onClick={onReset}
                    disabled={!hasSteps}
                    variant="outline"
                    size="sm"
                    className="w-full md:flex-1 h-11 rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white disabled:opacity-30"
                >
                    <span className="text-base">⏮</span> Reset
                </Button>
                <Button
                    onClick={onPrevious}
                    disabled={!hasSteps || currentStep === 0}
                    variant="outline"
                    size="sm"
                    className="w-full md:flex-1 h-11 rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white disabled:opacity-30"
                >
                    <span className="text-base">⏪</span> Prev
                </Button>
                <Button
                    onClick={onPlayPause}
                    disabled={!hasSteps}
                    variant="primary"
                    size="sm"
                    className="w-full md:flex-1 h-11 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-[#04170b] font-semibold disabled:opacity-30"
                >
                    {isPlaying ? (<><span className="text-base">⏸</span> Pause</>) : (<><span className="text-base">▶</span> Play</>)}
                </Button>
                <Button
                    onClick={onNext}
                    disabled={!hasSteps || currentStep === totalSteps - 1}
                    variant="outline"
                    size="sm"
                    className="w-full md:flex-1 h-11 rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white disabled:opacity-30"
                >
                    Next <span className="text-base">⏩</span>
                </Button>
            </div>

            {/* Speed Control */}
            <div>
                <label htmlFor="speed-slider" className="block text-sm font-semibold text-white/80 mb-2 tracking-wide">
                    Playback Speed
                </label>
                <input
                    id="speed-slider"
                    type="range"
                    min="0.25"
                    max="3"
                    step="0.25"
                    value={speed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    className="w-full accent-[#22c55e]"
                    aria-label="Playback speed"
                />
                <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>0.25x</span>
                    <span>1x</span>
                    <span>2x</span>
                    <span>3x</span>
                </div>
            </div>
        </div>
    );
}
