"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UniversalVisualizerControls, StepSnapshot } from "@/components/visualizer/PlaybackControls"
import { MarkdownContent } from "@/components/visualizer/ExplanationPanel"
import { useAVLTree } from "@/hooks/use-avl-tree"
import { AVLTreeDisplay } from "./avl-tree-display"
import { CodeDisplay } from "@/components/visualizer/CodePanel"
import { AVLTreeAnalysis } from "./avl-tree-analysis"
import { codeSnippets } from "@/lib/code-snippets"

interface AVLTreeVisualizerProps {
  content: React.ReactNode
}

export function AVLTreeVisualizer({ content }: AVLTreeVisualizerProps) {
  const {
    tree,
    highlightedNodes,
    insert,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    clear,
    isAnimating,
    traversalHistory,
    rotationHistory,
  } = useAVLTree()

  const [steps, setSteps] = useState<StepSnapshot[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [inputValue, setInputValue] = useState("")

  const handleTraversal = async (type: "inorder" | "preorder" | "postorder") => {
    switch (type) {
      case "inorder":
        await inorderTraversal()
        break
      case "preorder":
        await preorderTraversal()
        break
      case "postorder":
        await postorderTraversal()
        break
    }
  }

  const stateInspector = useMemo(() => {
    const countNodes = (node: any): number => {
      if (!node) return 0
      return 1 + countNodes(node.left) + countNodes(node.right)
    }
    return {
      variables: {
        nodes: countNodes(tree),
        rotations: rotationHistory.length,
        traversals: traversalHistory.length,
      },
      totalSteps: steps.length || 1,
      currentStepDescription: `AVL tree with ${countNodes(tree)} node${countNodes(tree) !== 1 ? "s" : ""}`,
    }
  }, [tree, rotationHistory, traversalHistory, steps.length])

  return (
    <div className="container mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AVL Tree</h1>
        <p className="text-muted-foreground">
          A self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one.
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
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
                        disabled={isAnimating}
                        className="rounded-full"
                      >
                        Insert
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => handleTraversal("inorder")}
                      variant="outline"
                      size="sm"
                      disabled={!tree || isAnimating}
                      className="rounded-full"
                    >
                      Inorder
                    </Button>
                    <Button
                      onClick={() => handleTraversal("preorder")}
                      variant="outline"
                      size="sm"
                      disabled={!tree || isAnimating}
                      className="rounded-full"
                    >
                      Preorder
                    </Button>
                    <Button
                      onClick={() => handleTraversal("postorder")}
                      variant="outline"
                      size="sm"
                      disabled={!tree || isAnimating}
                      className="rounded-full"
                    >
                      Postorder
                    </Button>
                  </div>
                  <Button
                    onClick={clear}
                    variant="destructive"
                    className="w-full rounded-full"
                    disabled={!tree || isAnimating}
                  >
                    Clear
                  </Button>
                </CardContent>
              </Card>

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
                  <AVLTreeDisplay
                    tree={tree}
                    highlightedNodes={highlightedNodes}
                  />
                </CardContent>
              </Card>
              <div className="mt-6">
                <CodeDisplay code={codeSnippets.binaryTree} language="javascript" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <AVLTreeAnalysis tree={tree} />
        </TabsContent>

        <TabsContent value="explanation" className="prose prose-invert max-w-none">
          <MarkdownContent content={content} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

