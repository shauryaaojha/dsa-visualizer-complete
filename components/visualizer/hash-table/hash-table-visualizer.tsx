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
  createInitialHashTableState,
  hashTableInsertGenerator,
  hashTableSearchGenerator,
  type HashTableState,
} from "@/lib/algorithms/hash-table"

export function HashTableVisualizer({ content }: { content: React.ReactNode }) {
  const [capacity] = useState(11)
  const [tableState, setTableState] = useState<HashTableState>(() => createInitialHashTableState(capacity))
  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const generateInsertSteps = (key: number) => {
    const generator = hashTableInsertGenerator(tableState, key)
    const stepArray: StepSnapshot[] = []
    for (const step of generator) {
      stepArray.push(step)
    }
    if (stepArray.length > 0) {
      const finalState = stepArray[stepArray.length - 1].state as HashTableState
      setTableState(finalState)
    }
    setSteps(stepArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const generateSearchSteps = (key: number) => {
    const generator = hashTableSearchGenerator(tableState, key)
    const stepArray: StepSnapshot[] = []
    for (const step of generator) {
      stepArray.push(step)
    }
    setSteps(stepArray)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const reset = () => {
    setTableState(createInitialHashTableState(capacity))
    setSteps([])
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const currentSnapshot = steps[currentStep] || { state: tableState, description: "", metrics: {} }
  const currentState = (currentSnapshot.state as HashTableState & { currentIndex?: number; found?: boolean }) || tableState
  const currentIndex = currentState.currentIndex

  const stateInspector = useMemo(() => {
    return {
      variables: {
        size: currentState.size,
        capacity: currentState.capacity,
        collisions: currentState.collisions,
        loadFactor: ((currentState.size / currentState.capacity) * 100).toFixed(1) + "%",
      },
      totalSteps: steps.length,
      currentStepDescription: currentSnapshot.description,
    }
  }, [currentSnapshot, steps.length, currentState])

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Hash Table (Linear Probing)</h1>
        <p className="text-muted-foreground">
          A hash table using linear probing for collision resolution.
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
                    <Label htmlFor="key-input">Key to Insert</Label>
                    <div className="flex gap-2">
                      <Input
                        id="key-input"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && inputValue) {
                            generateInsertSteps(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (inputValue) {
                            generateInsertSteps(parseInt(inputValue))
                            setInputValue("")
                          }
                        }}
                        className="rounded-full"
                      >
                        Insert
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search-input">Key to Search</Label>
                    <div className="flex gap-2">
                      <Input
                        id="search-input"
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && searchValue) {
                            generateSearchSteps(parseInt(searchValue))
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          if (searchValue) {
                            generateSearchSteps(parseInt(searchValue))
                          }
                        }}
                        variant="outline"
                        className="rounded-full"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
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
                    <div className="grid grid-cols-4 gap-2">
                      {currentState.table.map((value, index) => {
                        const isHighlighted = currentIndex === index
                        const isEmpty = value === null
                        return (
                          <div
                            key={index}
                            className={`relative border-2 rounded-lg p-4 text-center font-mono font-bold transition-all ${isEmpty
                              ? "bg-muted border-muted-foreground/30"
                              : isHighlighted
                                ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/50 scale-110"
                                : "bg-secondary border-secondary text-secondary-foreground"
                              }`}
                          >
                            {value !== null ? value : "∅"}
                            <div className="absolute -top-6 left-0 right-0 text-xs text-muted-foreground">
                              {index}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {currentState.found !== undefined && (
                      <div className={`text-center text-lg font-semibold ${currentState.found ? "text-green-500" : "text-red-500"}`}>
                        {currentState.found ? "✓ Found!" : "✗ Not Found"}
                      </div>
                    )}
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

