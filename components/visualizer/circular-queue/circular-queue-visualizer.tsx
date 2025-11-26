"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import {
  circularQueueEnqueueGenerator,
  circularQueueDequeueGenerator,
  createInitialCircularQueueState,
  CircularQueueState,
} from "@/lib/algorithms/circular-queue"

export function CircularQueueVisualizer({ content }: { content: React.ReactNode }) {
  const [capacity] = useState(8)
  const [queueState, setQueueState] = useState<CircularQueueState>(() => createInitialCircularQueueState(capacity))
  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")

  const generateEnqueueSteps = (value: number) => {
    const generator = circularQueueEnqueueGenerator(queueState, value)
    const stepArray: StepSnapshot[] = []
    for (const step of generator) {
      stepArray.push(step)
    }
    if (stepArray.length > 0) {
      const finalState = stepArray[stepArray.length - 1].state as CircularQueueState
      setQueueState(finalState)
    }
    setSteps(stepArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateDequeueSteps = () => {
    const generator = circularQueueDequeueGenerator(queueState)
    const stepArray: StepSnapshot[] = []
    for (const step of generator) {
      stepArray.push(step)
    }
    if (stepArray.length > 0) {
      const finalState = stepArray[stepArray.length - 1].state as CircularQueueState
      setQueueState(finalState)
    }
    setSteps(stepArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const reset = () => {
    setQueueState(createInitialCircularQueueState(capacity))
    setSteps([])
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const currentSnapshot = steps[currentStep] || { state: queueState, description: "", metrics: {} }
  const currentState = (currentSnapshot.state as CircularQueueState) || queueState

  const stateInspector = useMemo(() => {
    return {
      variables: {
        front: currentState.front,
        rear: currentState.rear,
        size: currentState.size,
        capacity: currentState.capacity,
      },
      totalSteps: steps.length,
      currentStepDescription: currentSnapshot.description,
    }
  }, [currentSnapshot, steps.length, currentState])

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Circular Queue</h1>
        <p className="text-muted-foreground">
          A circular queue (ring buffer) that reuses empty spaces efficiently.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="value-input">Value to Enqueue</Label>
                    <div className="flex gap-2">
                      <Input
                        id="value-input"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue) {
                            generateEnqueueSteps(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (inputValue) {
                            generateEnqueueSteps(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        className="rounded-full"
                      >
                        Enqueue
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={generateDequeueSteps}
                    variant="outline"
                    className="w-full rounded-full"
                    disabled={currentState.size === 0}
                  >
                    Dequeue
                  </Button>
                  <Button onClick={reset} variant="destructive" className="w-full rounded-full">
                    Reset
                  </Button>
                </CardContent>
              </Card>

              {steps.length > 0 && (
                <UniversalVisualizerControls
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  onReset={reset}
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  playbackSpeed={playbackSpeed}
                  onSpeedChange={setPlaybackSpeed}
                  stateInspector={stateInspector}
                />
              )}
            </div>

            <div className="xl:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                      {currentState.array.map((value, index) => {
                        const isFront = index === currentState.front
                        const isRear = index === currentState.rear
                        const isEmpty = value === null
                        return (
                          <div
                            key={index}
                            className={`relative w-16 h-16 border-2 rounded-lg flex items-center justify-center font-mono font-bold transition-all ${isEmpty
                              ? "bg-muted border-muted-foreground/30"
                              : isFront && isRear
                                ? "bg-green-500 border-green-600 text-white ring-4 ring-green-300"
                                : isFront
                                  ? "bg-blue-500 border-blue-600 text-white ring-2 ring-blue-300"
                                  : isRear
                                    ? "bg-purple-500 border-purple-600 text-white ring-2 ring-purple-300"
                                    : "bg-primary border-primary text-primary-foreground"
                              }`}
                          >
                            {value !== null ? value : "∅"}
                            <div className="absolute -top-6 text-xs text-muted-foreground">{index}</div>
                            {isFront && <div className="absolute -bottom-6 text-xs font-semibold">Front</div>}
                            {isRear && <div className="absolute -bottom-6 text-xs font-semibold">Rear</div>}
                          </div>
                        )
                      })}
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Size: {currentState.size} / {currentState.capacity}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

