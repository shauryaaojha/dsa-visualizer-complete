"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { GraphState, dfsGenerator } from "@/lib/algorithms/dfs"
import { bfsGenerator } from "@/lib/algorithms/bfs"
import ReactFlow, {
  type Node as ReactFlowNode,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow"
import "reactflow/dist/style.css"
import { useTheme } from "next-themes"

type Algorithm = "dfs" | "bfs"

interface GraphTraversalVisualizerProps {
  content: React.ReactNode
  algorithm: Algorithm
  title: string
}

const exampleGraphs = {
  simple: {
    nodes: [
      { id: 0, label: "0", x: 200, y: 100 },
      { id: 1, label: "1", x: 100, y: 200 },
      { id: 2, label: "2", x: 300, y: 200 },
      { id: 3, label: "3", x: 50, y: 300 },
      { id: 4, label: "4", x: 150, y: 300 },
      { id: 5, label: "5", x: 250, y: 300 },
      { id: 6, label: "6", x: 350, y: 300 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
    ],
  },
  complex: {
    nodes: [
      { id: 0, label: "0", x: 300, y: 50 },
      { id: 1, label: "1", x: 100, y: 150 },
      { id: 2, label: "2", x: 300, y: 150 },
      { id: 3, label: "3", x: 500, y: 150 },
      { id: 4, label: "4", x: 50, y: 250 },
      { id: 5, label: "5", x: 150, y: 250 },
      { id: 6, label: "6", x: 250, y: 250 },
      { id: 7, label: "7", x: 350, y: 250 },
      { id: 8, label: "8", x: 450, y: 250 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 2, to: 6 },
      { from: 2, to: 7 },
      { from: 3, to: 8 },
      { from: 5, to: 6 },
    ],
  },
}

export function GraphTraversalVisualizer({ content, algorithm, title }: GraphTraversalVisualizerProps) {
  const [graphState, setGraphState] = useState<GraphState>(() => ({
    nodes: exampleGraphs.simple.nodes,
    edges: exampleGraphs.simple.edges,
    visited: [],
    stack: [],
    queue: [],
    current: null,
    path: [],
  }))
  const [startNode, setStartNode] = useState(0)
  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { theme } = useTheme()

  const generateSteps = () => {
    const initialState: GraphState = {
      nodes: graphState.nodes,
      edges: graphState.edges,
      visited: new Set(),
      stack: [],
      queue: [],
      current: null,
      path: [],
    }

    let generator
    if (algorithm === "dfs") {
      generator = dfsGenerator(initialState, startNode)
    } else {
      generator = bfsGenerator(initialState, startNode)
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
  }, [startNode, algorithm, graphState.nodes, graphState.edges])

  const currentSnapshot = steps[currentStep] || {
    state: graphState,
    description: "",
    metrics: {},
  }
  const currentState = (currentSnapshot.state as GraphState) || graphState

  useEffect(() => {
    const visitedArray = Array.isArray(currentState.visited)
      ? currentState.visited
      : currentState.visited instanceof Set
        ? Array.from(currentState.visited)
        : []

    const flowNodes: ReactFlowNode[] = currentState.nodes.map((node) => {
      const isVisited = visitedArray.includes(node.id)
      const isCurrent = currentState.current === node.id
      const isInPath = currentState.path?.includes(node.id) || false

      return {
        id: node.id.toString(),
        position: { x: node.x, y: node.y },
        data: { label: node.label },
        style: {
          background: isCurrent
            ? "#3b82f6"
            : isVisited
              ? "#10b981"
              : "#6b7280",
          color: "#fff",
          border: isInPath ? "3px solid #fbbf24" : "2px solid #374151",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        },
      }
    })

    const flowEdges: Edge[] = currentState.edges.map((edge) => {
      const isInPath = currentState.path?.some((node, index) => {
        const nextNode = currentState.path?.[index + 1]
        return (
          nextNode &&
          ((edge.from === node && edge.to === nextNode) ||
            (edge.to === node && edge.from === nextNode))
        )
      })

      return {
        id: `${edge.from}-${edge.to}`,
        source: edge.from.toString(),
        target: edge.to.toString(),
        style: {
          stroke: isInPath ? "#fbbf24" : theme === "dark" ? "#fff" : "#000",
          strokeWidth: isInPath ? 3 : 2,
        },
        animated: isInPath,
      }
    })

    setNodes(flowNodes)
    setEdges(flowEdges)
  }, [currentState, theme, setNodes, setEdges])

  const loadExample = (name: keyof typeof exampleGraphs) => {
    const example = exampleGraphs[name]
    setGraphState({
      nodes: example.nodes,
      edges: example.edges,
      visited: [],
      stack: [],
      queue: [],
      current: null,
      path: [],
    })
  }

  const stateInspector = useMemo(() => {
    const stackOrQueue = algorithm === "dfs" ? currentState.stack : currentState.queue
    const visitedArray = Array.isArray(currentState.visited)
      ? currentState.visited
      : currentState.visited instanceof Set
        ? Array.from(currentState.visited)
        : []

    return {
      variables: {
        current: currentState.current ?? "None",
        visited: visitedArray.length,
        [`${algorithm === "dfs" ? "stack" : "queue"}`]: `[${stackOrQueue?.join(", ") || ""}]`,
        path: currentState.path?.join(" → ") || "None",
      },
      totalSteps: steps.length,
      currentStepDescription: currentSnapshot.description,
    }
  }, [currentSnapshot, steps.length, currentState, algorithm])

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Visualize how {title} traverses a graph step by step
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
                    <label className="text-sm font-medium">Start Node</label>
                    <Select
                      value={startNode.toString()}
                      onValueChange={(value) => setStartNode(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {graphState.nodes.map((node) => (
                          <SelectItem key={node.id} value={node.id.toString()}>
                            Node {node.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Example Graphs</label>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => loadExample("simple")}
                        variant="outline"
                        className="flex-1 rounded-full"
                      >
                        Simple
                      </Button>
                      <Button
                        onClick={() => loadExample("complex")}
                        variant="outline"
                        className="flex-1 rounded-full"
                      >
                        Complex
                      </Button>
                    </div>
                  </div>
                  <Button onClick={generateSteps} className="w-full rounded-full">
                    Start {title}
                  </Button>
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

            <div className="xl:col-span-2">
              <Card>
                <CardContent className="pt-6 p-0">
                  <div className="h-[600px] bg-background rounded-lg overflow-hidden border">
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      fitView
                      fitViewOptions={{ padding: 0.2 }}
                    >
                      <Background color={theme === "dark" ? "#ffffff" : "#000000"} gap={12} size={1} />
                      <Controls position="bottom-right" />
                    </ReactFlow>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span>Current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span>Visited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <span>Unvisited</span>
                      </div>
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

