"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { useHeap } from "@/hooks/use-heap"
import { HeapArray } from "./heap-array"
import { HeapDisplay } from "./heap-display"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { codeSnippets } from "@/lib/code-snippets"

interface HeapVisualizerProps {
  content: React.ReactNode
}

export function HeapVisualizer({ content }: HeapVisualizerProps) {
  const {
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  } = useHeap()

  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")

  const stateInspector = useMemo(() => {
    return {
      variables: {
        type: heapType === 'max' ? 'Max Heap' : 'Min Heap',
        size: heapArray.length,
        root: heapArray[0] || "None",
      },
      totalSteps: steps.length || 1,
      currentStepDescription: `${heapType === 'max' ? 'Max' : 'Min'} heap with ${heapArray.length} element${heapArray.length !== 1 ? "s" : ""}`,
    }
  }, [heapType, heapArray, steps.length])

  return (
    <div className="container mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {heapType === 'max' ? 'Max Heap' : 'Min Heap'}
        </h1>
        <p className="text-muted-foreground">
          A complete binary tree where each parent node is {heapType === 'max' ? 'greater' : 'smaller'} than its children.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="insert-value">Insert Value</Label>
                    <div className="flex gap-2">
                      <Input
                        id="insert-value"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue) {
                            insert(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        placeholder="Enter value"
                        className="rounded-full"
                      />
                      <Button
                        onClick={() => {
                          if (inputValue) {
                            insert(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        className="rounded-full"
                      >
                        Insert
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => insertMany([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)].join(","))}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Insert Multiple
                  </Button>
                  <Button
                    onClick={toggleHeapType}
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    Switch to {heapType === 'max' ? 'Min' : 'Max'} Heap
                  </Button>
                  <Button
                    onClick={clear}
                    variant="destructive"
                    className="w-full rounded-full"
                  >
                    Clear
                  </Button>
                </CardContent>
              </Card>

              <HeapArray array={heapArray} />

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

            {/* Right Column */}
            <div className="lg:col-span-7">
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <HeapDisplay
                    heap={heap}
                    highlightedNodes={highlightedNodes}
                  />
                </CardContent>
              </Card>
              <div className="mt-6">
                <CodeDisplay code={codeSnippets.heap} language="javascript" />
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

