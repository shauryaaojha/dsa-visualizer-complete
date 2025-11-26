"use client"

import { useCallback, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

export interface StepSnapshot {
  highlightedIndices?: number[]
  description: string
  state?: any
  metrics?: {
    comparisons?: number
    swaps?: number
    [key: string]: any
  }
}

export interface UniversalVisualizerControlsProps {
  steps: StepSnapshot[]
  currentStep: number
  onStepChange: (step: number) => void
  onReset: () => void
  isPlaying: boolean
  onPlayPause: () => void
  playbackSpeed: number
  onSpeedChange: (speed: number) => void
  stateInspector?: {
    variables?: Record<string, any>
    comparisons?: number
    swaps?: number
    totalSteps?: number
    currentStepDescription?: string
  }
}

export function UniversalVisualizerControls({
  steps,
  currentStep,
  onStepChange,
  onReset,
  isPlaying,
  onPlayPause,
  playbackSpeed,
  onSpeedChange,
  stateInspector,
}: UniversalVisualizerControlsProps) {
  const totalSteps = steps.length
  const currentSnapshot = steps[currentStep] || steps[0] || { description: "Initial state", metrics: {} }
  const progress = totalSteps > 0 ? (currentStep / Math.max(totalSteps - 1, 1)) * 100 : 0

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }, [currentStep, onStepChange])

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1)
    }
  }, [currentStep, totalSteps, onStepChange])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case " ":
          e.preventDefault()
          onPlayPause()
          break
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
        case "r":
        case "R":
          e.preventDefault()
          onReset()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onPlayPause, handlePrevious, handleNext, onReset])

  // Auto-play when playing
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps - 1) {
      return
    }

    const delay = 1000 / playbackSpeed
    const timer = setTimeout(() => {
      handleNext()
    }, delay)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, totalSteps, playbackSpeed, handleNext])

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Playback Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Play/Pause, Previous, Next, Reset */}
          <div className="flex gap-3">
            <Button
              onClick={onPlayPause}
              variant="default"
              size="lg"
              className="flex-1 rounded-xl font-semibold shadow-lg shadow-primary/20"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </>
              )}
            </Button>
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              disabled={currentStep === 0}
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleNext}
              variant="outline"
              size="lg"
              disabled={currentStep >= totalSteps - 1}
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="rounded-xl"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-foreground">Step {currentStep + 1} / {totalSteps}</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden border border-primary/20">
              <div
                className="bg-gradient-to-r from-primary via-accent to-primary h-3 rounded-full transition-all duration-500 shadow-lg shadow-primary/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Playback Speed Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-foreground">Playback Speed</span>
              <span className="text-primary font-bold">{playbackSpeed}x</span>
            </div>
            <Slider
              value={[playbackSpeed]}
              onValueChange={([value]) => onSpeedChange(value)}
              min={0.25}
              max={3}
              step={0.25}
              className="w-full"
            />
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>0.25x</span>
              <span>1x</span>
              <span>3x</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Info */}
      <Card className="liquid-glass border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-accent">Current Step</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/90 leading-relaxed font-medium">
            {currentSnapshot?.description || "No step description available"}
          </p>
        </CardContent>
      </Card>

      {/* State Inspector */}
      {stateInspector && (
        <Card className="lg:block hidden liquid-glass border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold">State Inspector</CardTitle>
            <CardDescription className="font-medium">Real-time algorithm metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stateInspector.variables && (
              <div>
                <h4 className="text-sm font-bold mb-3 text-primary">Variables</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(stateInspector.variables).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-secondary/30 border border-primary/10">
                      <span className="text-muted-foreground font-medium">{key}:</span>
                      <span className="font-mono font-bold text-primary">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/10">
              {stateInspector.comparisons !== undefined && (
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">Comparisons</div>
                  <div className="text-2xl font-black text-primary">{stateInspector.comparisons}</div>
                </div>
              )}
              {stateInspector.swaps !== undefined && (
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">Swaps</div>
                  <div className="text-2xl font-black text-accent">{stateInspector.swaps}</div>
                </div>
              )}
              {stateInspector.totalSteps !== undefined && (
                <div className="p-3 rounded-xl bg-secondary/30 border border-primary/10 col-span-2">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">Total Steps</div>
                  <div className="text-2xl font-black text-foreground">{stateInspector.totalSteps}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile State Inspector (collapsed) */}
      {stateInspector && (
        <Card className="lg:hidden liquid-glass border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold">State Inspector</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stateInspector.variables && (
              <div>
                <h4 className="text-sm font-bold mb-3 text-primary">Variables</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(stateInspector.variables).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-secondary/30 border border-primary/10">
                      <span className="text-muted-foreground font-medium">{key}:</span>
                      <span className="font-mono font-bold text-primary">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/10">
              {stateInspector.comparisons !== undefined && (
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">Comparisons</div>
                  <div className="text-2xl font-black text-primary">{stateInspector.comparisons}</div>
                </div>
              )}
              {stateInspector.swaps !== undefined && (
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">Swaps</div>
                  <div className="text-2xl font-black text-accent">{stateInspector.swaps}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

