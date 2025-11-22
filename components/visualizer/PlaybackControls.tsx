import { Card } from '@/components/ui/Card';
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
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Playback Controls</h2>

            <div className="space-y-4">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                        Step {hasSteps ? currentStep + 1 : 0} / {totalSteps}
                    </span>
                    <span className="text-gray-600">
                        Speed: {speed}x
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: hasSteps ? `${((currentStep + 1) / totalSteps) * 100}%` : '0%' }}
                    />
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                    <Button
                        onClick={onReset}
                        disabled={!hasSteps}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        ⏮ Reset
                    </Button>
                    <Button
                        onClick={onPrevious}
                        disabled={!hasSteps || currentStep === 0}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        ⏪ Prev
                    </Button>
                    <Button
                        onClick={onPlayPause}
                        disabled={!hasSteps}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                    >
                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </Button>
                    <Button
                        onClick={onNext}
                        disabled={!hasSteps || currentStep === totalSteps - 1}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        Next ⏩
                    </Button>
                </div>

                {/* Speed Control */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Playback Speed
                    </label>
                    <input
                        type="range"
                        min="0.25"
                        max="3"
                        step="0.25"
                        value={speed}
                        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.25x</span>
                        <span>1x</span>
                        <span>2x</span>
                        <span>3x</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
