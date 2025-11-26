"use client"

import { useState, useEffect, useMemo } from "react"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { bubbleSortGenerator } from "@/lib/algorithms/bubble-sort"
import { selectionSortGenerator } from "@/lib/algorithms/selection-sort"
import { insertionSortGenerator } from "@/lib/algorithms/insertion-sort"
import { codeSnippets } from "@/lib/code-snippets"

type SortAlgorithm = "bubble" | "selection" | "insertion"

interface SortingVisualizerProps {
  content: React.ReactNode
  algorithm: SortAlgorithm
  title: string
}

export function SortingVisualizer({ content, algorithm, title }: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [inputValue, setInputValue] = useState("64,34,25,12,22,11,90")
  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const generateSteps = () => {
    let generator
    switch (algorithm) {
      case "bubble":
        generator = bubbleSortGenerator(array)
        break
      case "selection":
        generator = selectionSortGenerator(array)
        break
      case "insertion":
        generator = insertionSortGenerator(array)
        break
      default:
        return
    }

    const stepArray: StepSnapshot[] = []
    for (const step of generator) {
      stepArray.push(step)
    }
    setSteps(stepArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (array.length > 0) {
      generateSteps()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array, algorithm])

  const currentSnapshot = steps[currentStep] || { state: { array: array }, description: "Initial state", metrics: {} }
  const currentArray = currentSnapshot.state?.array || array
  const highlightedIndices = currentSnapshot.highlightedIndices || []

  const handleArrayChange = () => {
    try {
      const newArray = inputValue
        .split(",")
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n))
      if (newArray.length > 0) {
        setArray(newArray)
      }
    } catch (e) {
      // Invalid input, ignore
    }
  }

  const randomizeArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setInputValue(newArray.join(","))
  }

  const stateInspector = useMemo(() => {
    const metrics = currentSnapshot.metrics || {}
    return {
      comparisons: metrics.comparisons || 0,
      swaps: metrics.swaps || 0,
      totalSteps: steps.length,
      currentStepDescription: currentSnapshot.description,
    }
  }, [currentSnapshot, steps.length])

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Visualize how {title} works step by step
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Controls, Code, Inspector */}
            <div className="lg:col-span-5 space-y-6">
              {/* Input Controls */}
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Array Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="array-input">Array (comma-separated)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="array-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleArrayChange}
                        onKeyDown={(e) => e.key === "Enter" && handleArrayChange()}
                        className="rounded-xl"
                      />
                      <Button onClick={randomizeArray} variant="outline" className="rounded-full">
                        Random
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Universal Controls */}
              <UniversalVisualizerControls
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                onReset={() => {
                  setCurrentStep(0)
                  setIsPlaying(false)
                }}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                playbackSpeed={playbackSpeed}
                onSpeedChange={setPlaybackSpeed}
                stateInspector={stateInspector}
              />

              {/* Code Display */}
            </div>

            {/* Right Column - Visualization */}
            <div className="lg:col-span-7">
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3 justify-center items-end min-h-[400px] p-6">
                    {currentArray.length > 0 ? (
                      currentArray.map((value: number, index: number) => {
                        const maxValue = Math.max(...currentArray, 1)
                        const height = (value / maxValue) * 300
                        return (
                          <div
                            key={`${index}-${value}`}
                            className={`flex flex-col items-center transition-all duration-300 ${highlightedIndices.includes(index)
                              ? "scale-110 z-10"
                              : ""
                              }`}
                          >
                            <div
                              className={`w-14 md:w-20 text-center font-mono font-bold text-base rounded-t-xl px-3 py-2 transition-all duration-300 flex items-center justify-center ${highlightedIndices.includes(index)
                                ? "bg-primary text-primary-foreground shadow-xl shadow-primary/50 ring-4 ring-primary/40"
                                : "bg-secondary/80 text-secondary-foreground border-2 border-primary/20"
                                }`}
                              style={{
                                height: `${height}px`,
                                minHeight: "50px",
                              }}
                            >
                              {value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2 font-semibold">{index}</div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center text-muted-foreground py-20">
                        <p className="text-lg">No array to display</p>
                        <p className="text-sm mt-2">Enter array values above</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Code Display */}
              <div className="mt-6">
                <CodeDisplay
                  code={codeSnippets[algorithm === "bubble" ? "bubbleSort" : algorithm === "selection" ? "selectionSort" : "insertionSort"]}
                  highlightedLine={currentStep > 0 ? Math.min(currentStep % 5 + 1, 10) : undefined}
                  language="javascript"
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

