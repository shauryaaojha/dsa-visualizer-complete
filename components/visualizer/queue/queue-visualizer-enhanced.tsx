"use client"

import { useState, useMemo } from "react"
import { QueueDisplay } from "@/components/visualizer/queue/queue-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQueue } from "@/hooks/use-queue"
import { codeSnippets } from "@/lib/code-snippets"

interface QueueVisualizerProps {
  content: React.ReactNode
}

export function QueueVisualizer({ content }: QueueVisualizerProps) {
  const {
    queue,
    operations,
    isAnimating,
    highlightedIndex,
    enqueue,
    dequeue,
    clear,
    isFull,
    isEmpty,
  } = useQueue()

  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")

  const generateSteps = () => {
    const stepArray: StepSnapshot[] = []
    stepArray.push({
      state: { queue: [], front: 0, rear: -1 },
      description: "Queue initialized (empty)",
      metrics: { size: 0 },
    })
    setSteps(stepArray)
    setCurrentStep(0)
  }

  const handleEnqueue = async (value: number) => {
    await enqueue(value)
    generateSteps()
  }

  const handleDequeue = async () => {
    await dequeue()
    generateSteps()
  }

  const stateInspector = useMemo(() => {
    return {
      variables: {
        front: 0,
        rear: queue.length - 1,
        size: queue.length,
        isEmpty: isEmpty ? "Yes" : "No",
        isFull: isFull ? "Yes" : "No",
      },
      totalSteps: steps.length || 1,
      currentStepDescription: `Queue with ${queue.length} element${queue.length !== 1 ? "s" : ""}`,
    }
  }, [queue, isEmpty, isFull, steps.length])

  return (
    <div className="container mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Queue</h1>
        <p className="text-muted-foreground">
          A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Controls and Code */}
            <div className="lg:col-span-5 space-y-6">
              {/* Input Controls */}
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="enqueue-value">Enqueue Value</Label>
                    <div className="flex gap-2">
                      <Input
                        id="enqueue-value"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue && !isFull) {
                            handleEnqueue(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        placeholder="Enter value"
                        className="rounded-full"
                      />
                      <Button
                        onClick={() => {
                          if (inputValue && !isFull) {
                            handleEnqueue(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        disabled={isFull || isAnimating}
                        className="rounded-full"
                      >
                        Enqueue
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleDequeue}
                    variant="outline"
                    className="w-full rounded-full"
                    disabled={isEmpty || isAnimating}
                  >
                    Dequeue
                  </Button>
                  <Button
                    onClick={clear}
                    variant="destructive"
                    className="w-full rounded-full"
                    disabled={isEmpty || isAnimating}
                  >
                    Clear
                  </Button>
                </CardContent>
              </Card>

              {/* Universal Controls */}
              {steps.length > 0 && (
                <UniversalVisualizerControls
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  onReset={() => {
                    clear()
                    setCurrentStep(0)
                    setIsPlaying(false)
                  }}
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  playbackSpeed={playbackSpeed}
                  onSpeedChange={setPlaybackSpeed}
                  stateInspector={stateInspector}
                />
              )}

            </div>

            {/* Right Column - Visualization */}
            <div className="lg:col-span-7">
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <QueueDisplay
                    queue={queue}
                    highlightedIndex={highlightedIndex}
                  />
                </CardContent>
              </Card>

              {/* Code Display */}
              <div className="mt-6">
                <CodeDisplay
                  code={codeSnippets.queue}
                  highlightedLine={queue.length > 0 ? (isEmpty ? 1 : queue.length === 1 ? 4 : 7) : undefined}
                  language="c"
                />
              </div>
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
