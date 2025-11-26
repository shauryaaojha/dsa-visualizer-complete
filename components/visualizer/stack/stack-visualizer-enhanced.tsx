"use client"

import { useState, useMemo } from "react"
import { StackDisplay } from "@/components/visualizer/stack/stack-display"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStack } from "@/hooks/use-stack"
import { codeSnippets } from "@/lib/code-snippets"

interface StackVisualizerProps {
  content: React.ReactNode
}

export function StackVisualizer({ content }: StackVisualizerProps) {
  const {
    stack,
    operations,
    isAnimating,
    highlightedIndex,
    push,
    pop,
    clear,
    isFull,
    isEmpty,
  } = useStack()

  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")

  // Convert stack operations to steps for playback
  const generateSteps = () => {
    const stepArray: StepSnapshot[] = []
    stepArray.push({
      state: { stack: [], top: -1 },
      description: "Stack initialized (empty)",
      metrics: { size: 0 },
    })
    setSteps(stepArray)
    setCurrentStep(0)
  }

  const handlePush = async (value: number) => {
    await push(value)
    generateSteps()
  }

  const handlePop = async () => {
    await pop()
    generateSteps()
  }

  const stateInspector = useMemo(() => {
    return {
      variables: {
        top: stack.length - 1,
        size: stack.length,
        isEmpty: isEmpty ? "Yes" : "No",
        isFull: isFull ? "Yes" : "No",
      },
      totalSteps: steps.length || 1,
      currentStepDescription: `Stack with ${stack.length} element${stack.length !== 1 ? "s" : ""}`,
    }
  }, [stack, isEmpty, isFull, steps.length])

  return (
    <div className="container mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Stack</h1>
        <p className="text-muted-foreground">
          A Last-In-First-Out (LIFO) data structure with push and pop operations.
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="push-value">Push Value</Label>
                    <div className="flex gap-2">
                      <Input
                        id="push-value"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue && !isFull) {
                            handlePush(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        placeholder="Enter value"
                      />
                      <Button
                        onClick={() => {
                          if (inputValue && !isFull) {
                            handlePush(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        disabled={isFull || isAnimating}
                        className="rounded-full"
                      >
                        Push
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handlePop}
                    variant="outline"
                    className="w-full rounded-full"
                    disabled={isEmpty || isAnimating}
                  >
                    Pop
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <StackDisplay
                    stack={stack}
                    highlightedIndex={highlightedIndex}
                  />
                </CardContent>
              </Card>

              {/* Code Display */}
              <div className="mt-6">
                <CodeDisplay
                  code={codeSnippets.stack}
                  highlightedLine={stack.length > 0 ? (isEmpty ? 1 : stack.length === 1 ? 4 : 7) : undefined}
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
    </div >
  )
}

