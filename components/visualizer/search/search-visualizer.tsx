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
import { linearSearchGenerator } from "@/lib/algorithms/linear-search"
import { binarySearchGenerator } from "@/lib/algorithms/binary-search"
import { codeSnippets } from "@/lib/code-snippets"

type SearchAlgorithm = "linear" | "binary"

interface SearchVisualizerProps {
  content: React.ReactNode
  algorithm: SearchAlgorithm
  title: string
}

export function SearchVisualizer({ content, algorithm, title }: SearchVisualizerProps) {
  const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 67, 78, 89, 90])
  const [inputValue, setInputValue] = useState("2,5,8,12,16,23,38,45,67,78,89,90")
  const [target, setTarget] = useState(23)
  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const generateSteps = () => {
    let generator
    if (algorithm === "linear") {
      generator = linearSearchGenerator(array, target)
    } else {
      generator = binarySearchGenerator(array, target)
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
    generateSteps()
  }, [array, target, algorithm])

  const currentSnapshot = steps[currentStep] || { state: { array: [] }, description: "", metrics: {} }
  const currentArray = currentSnapshot.state?.array || array
  const highlightedIndices = currentSnapshot.highlightedIndices || []
  const currentState = currentSnapshot.state || {}

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
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1)
    const sortedArray = algorithm === "binary" ? newArray.sort((a, b) => a - b) : newArray
    setArray(sortedArray)
    setInputValue(sortedArray.join(","))
  }

  const stateInspector = useMemo(() => {
    const metrics = currentSnapshot.metrics || {}
    const variables: Record<string, any> = {}

    if (currentState.left !== undefined) variables.left = currentState.left
    if (currentState.right !== undefined) variables.right = currentState.right
    if (currentState.mid !== undefined) variables.mid = currentState.mid
    if (currentState.currentIndex !== undefined) variables.currentIndex = currentState.currentIndex
    if (currentState.found !== undefined) variables.found = currentState.found ? "Yes" : "No"

    return {
      variables,
      comparisons: metrics.comparisons || 0,
      totalSteps: steps.length,
      currentStepDescription: currentSnapshot.description,
    }
  }, [currentSnapshot, steps.length, currentState])

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
                  <CardTitle className="text-lg">Search Parameters</CardTitle>
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
                        className="rounded-full"
                      />
                      <Button onClick={randomizeArray} variant="outline" className="rounded-full">
                        Random
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-input">Target Value</Label>
                    <Input
                      id="target-input"
                      type="number"
                      value={target}
                      onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                      onKeyDown={(e) => e.key === "Enter" && generateSteps()}
                      className="rounded-full"
                    />
                  </div>
                  <Button onClick={generateSteps} className="w-full rounded-full">
                    Search
                  </Button>
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

            </div>

            {/* Right Column - Visualization */}
            <div className="lg:col-span-7">
              <Card className="liquid-glass">
                <CardHeader>
                  <CardTitle className="text-lg">Visualization</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 text-center">
                    <div className="text-lg font-semibold">Searching for: {target}</div>
                    {currentState.found !== undefined && (
                      <div className={`mt-2 text-lg ${currentState.found ? "text-green-500" : "text-red-500"}`}>
                        {currentState.found ? "✓ Found!" : "✗ Not Found"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center items-end min-h-[300px] p-4">
                    {currentArray.map((value: number, index: number) => {
                      const isHighlighted = highlightedIndices.includes(index)
                      const isTarget = value === target
                      return (
                        <div
                          key={index}
                          className={`flex flex-col items-center transition-all duration-300 ${isHighlighted ? "scale-110 z-10" : ""
                            }`}
                        >
                          <div
                            className={`w-12 md:w-16 text-center font-mono font-bold text-lg rounded-t-lg px-2 py-4 transition-all duration-300 ${isHighlighted
                              ? isTarget
                                ? "bg-green-500 text-white shadow-lg ring-4 ring-green-300"
                                : "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30"
                              : isTarget
                                ? "bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-100"
                                : "bg-secondary text-secondary-foreground"
                              }`}
                            style={{
                              height: `${(value / Math.max(...currentArray, 1)) * 250}px`,
                              minHeight: "40px",
                            }}
                          >
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{index}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Code Display */}
              <div className="mt-6">
                <CodeDisplay
                  code={codeSnippets[algorithm === "linear" ? "linearSearch" : "binarySearch"]}
                  highlightedLine={currentStep > 0 ? Math.min(currentStep % 3 + 1, 10) : undefined}
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
    </div>
  )
}
