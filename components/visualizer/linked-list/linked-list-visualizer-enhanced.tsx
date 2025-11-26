"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { LinkedListDisplay } from "@/components/visualizer/linked-list/linked-list-display"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useLinkedList } from "@/hooks/use-linked-list"
import { ListType } from "./types"
import { codeSnippets } from "@/lib/code-snippets"

const LIST_TYPES: { value: ListType; label: string }[] = [
  { value: 'SLL', label: 'SLL' },
  { value: 'DLL', label: 'DLL' },
  { value: 'CSLL', label: 'CSLL' },
  { value: 'CDLL', label: 'CDLL' },
]

interface LinkedListVisualizerProps {
  content: React.ReactNode
}

export function LinkedListVisualizer({ content }: LinkedListVisualizerProps) {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Linked List</h1>
        <p className="text-muted-foreground">
          A dynamic data structure with nodes connected through references.
        </p>
      </div>

      <Tabs defaultValue="SLL" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {LIST_TYPES.map(type => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="explanation">Info</TabsTrigger>
        </TabsList>

        {LIST_TYPES.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-6">
            <LinkedListContent type={type.value} />
          </TabsContent>
        ))}

        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LinkedListContent({ type }: { type: ListType }) {
  const {
    list,
    operations,
    animationState,
    isAnimating,
    insertFront,
    insertBack,
    deleteFront,
    deleteBack,
    reverse,
  } = useLinkedList(type)

  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const stateInspector = useMemo(() => {
    const nodeCount = list.nodes.size
    return {
      variables: {
        nodes: nodeCount,
        head: list.head ? "Set" : "Null",
        tail: list.tail ? "Set" : "Null",
        type: type,
      },
      totalSteps: steps.length || 1,
      currentStepDescription: `Linked list with ${nodeCount} node${nodeCount !== 1 ? "s" : ""}`,
    }
  }, [list, type, steps.length])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 space-y-6">
        <Card className="liquid-glass">
          <CardHeader>
            <CardTitle className="text-lg">Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => insertFront(Math.floor(Math.random() * 100))}
                disabled={isAnimating}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Insert Front
              </button>
              <button
                onClick={() => insertBack(Math.floor(Math.random() * 100))}
                disabled={isAnimating}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Insert Back
              </button>
              <button
                onClick={deleteFront}
                disabled={isAnimating || !list.head}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
              >
                Delete Front
              </button>
              <button
                onClick={deleteBack}
                disabled={isAnimating || !list.head}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
              >
                Delete Back
              </button>
            </div>
            <button
              onClick={reverse}
              disabled={isAnimating || !list.head}
              className="w-full px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
            >
              Reverse
            </button>
          </CardContent>
        </Card>

        {steps.length > 0 && (
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
        )}

      </div>
      <div className="lg:col-span-7">
        <Card className="liquid-glass">
          <CardHeader>
            <CardTitle className="text-lg">Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <LinkedListDisplay
              list={list}
              highlightedNodes={animationState.highlightedNodes}
              message={animationState.message}
            />
          </CardContent>
        </Card>
        <div className="mt-6">
          <CodeDisplay code={codeSnippets.linkedList} language="javascript" />
        </div>
      </div>
    </div>
  )
}

