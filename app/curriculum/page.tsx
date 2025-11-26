"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle2, Circle, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const curriculum = [
  {
    title: "Introduction to Data Structures",
    description: "Learn the fundamentals of data structures and their importance in computer science",
    duration: "2 weeks",
    topics: [
      { name: "What are Data Structures?", completed: true },
      { name: "Arrays and Lists", completed: true },
      { name: "Time and Space Complexity", completed: false },
    ],
    visualizers: ["/visualizer/stack", "/visualizer/queue"],
  },
  {
    title: "Linear Data Structures",
    description: "Master stacks, queues, and linked lists",
    duration: "3 weeks",
    topics: [
      { name: "Stacks (LIFO)", completed: true },
      { name: "Queues (FIFO)", completed: true },
      { name: "Circular Queues", completed: true },
      { name: "Linked Lists", completed: true },
      { name: "Doubly Linked Lists", completed: false },
    ],
    visualizers: ["/visualizer/stack", "/visualizer/queue", "/visualizer/circular-queue", "/visualizer/linked-list"],
  },
  {
    title: "Searching and Sorting Algorithms",
    description: "Understand fundamental algorithms for searching and sorting",
    duration: "2 weeks",
    topics: [
      { name: "Linear Search", completed: true },
      { name: "Binary Search", completed: true },
      { name: "Bubble Sort", completed: true },
      { name: "Selection Sort", completed: true },
      { name: "Insertion Sort", completed: true },
      { name: "Merge Sort", completed: false },
      { name: "Quick Sort", completed: false },
    ],
    visualizers: [
      "/visualizer/linear-search",
      "/visualizer/binary-search",
      "/visualizer/bubble-sort",
      "/visualizer/selection-sort",
      "/visualizer/insertion-sort",
    ],
  },
  {
    title: "Trees and Hierarchical Structures",
    description: "Explore binary trees, BSTs, and balanced trees",
    duration: "3 weeks",
    topics: [
      { name: "Binary Trees", completed: true },
      { name: "Binary Search Trees", completed: true },
      { name: "Tree Traversals", completed: true },
      { name: "AVL Trees", completed: true },
      { name: "Heaps", completed: true },
      { name: "Red-Black Trees", completed: false },
    ],
    visualizers: [
      "/visualizer/binary-tree",
      "/visualizer/avl-tree",
      "/visualizer/heap",
    ],
  },
  {
    title: "Hash Tables and Dictionaries",
    description: "Learn about hash functions and collision resolution",
    duration: "2 weeks",
    topics: [
      { name: "Hash Functions", completed: true },
      { name: "Collision Resolution", completed: true },
      { name: "Linear Probing", completed: true },
      { name: "Chaining", completed: false },
    ],
    visualizers: ["/visualizer/hash-table"],
  },
  {
    title: "Graph Algorithms",
    description: "Master graph traversal and pathfinding algorithms",
    duration: "3 weeks",
    topics: [
      { name: "Graph Representation", completed: true },
      { name: "Depth-First Search (DFS)", completed: true },
      { name: "Breadth-First Search (BFS)", completed: true },
      { name: "Dijkstra's Algorithm", completed: true },
      { name: "Minimum Spanning Trees", completed: false },
      { name: "Topological Sort", completed: false },
    ],
    visualizers: [
      "/visualizer/dfs",
      "/visualizer/bfs",
      "/visualizer/dijkstra",
    ],
  },
  {
    title: "Advanced Applications",
    description: "Apply data structures to real-world problems",
    duration: "2 weeks",
    topics: [
      { name: "Expression Evaluation", completed: true },
      { name: "Message Queues", completed: true },
      { name: "Polynomial Operations", completed: true },
      { name: "Data Compression", completed: true },
      { name: "Priority Queues", completed: false },
    ],
    visualizers: [
      "/visualizer/stack-applications",
      "/visualizer/queue-applications",
      "/visualizer/polynomial",
      "/visualizer/huffman",
    ],
  },
]

export default function CurriculumPage() {
  const totalTopics = curriculum.reduce((sum, module) => sum + module.topics.length, 0)
  const completedTopics = curriculum.reduce(
    (sum, module) => sum + module.topics.filter((t) => t.completed).length,
    0
  )
  const progress = Math.round((completedTopics / totalTopics) * 100)

  return (
    <div className="container mx-auto py-12 space-y-10">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/20 border-2 border-primary/30 backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tight gradient-text">Learning Curriculum</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mt-2 font-medium">
              A structured learning path to master data structures and algorithms through interactive visualizations.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="liquid-glass border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl font-black">Your Progress</CardTitle>
          <CardDescription className="text-base font-medium">
            {completedTopics} of {totalTopics} topics completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-base font-bold">
              <span className="text-foreground">Overall Progress</span>
              <span className="text-primary text-xl">{progress}%</span>
            </div>
            <div className="w-full bg-secondary/50 rounded-full h-4 overflow-hidden border border-primary/20">
              <div
                className="bg-gradient-to-r from-primary via-accent to-primary h-4 rounded-full transition-all duration-700 shadow-lg shadow-primary/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {curriculum.map((module, index) => {
          const moduleProgress = Math.round(
            (module.topics.filter((t) => t.completed).length / module.topics.length) * 100
          )
          return (
            <Card key={index} className="liquid-glass hover:scale-[1.02] transition-all duration-300 border-2 border-primary/20 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="font-bold border-primary/30 bg-primary/10">Module {index + 1}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{module.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{module.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{moduleProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Topics</h4>
                  <div className="space-y-1">
                    {module.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        {topic.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span
                          className={
                            topic.completed
                              ? "text-foreground line-through opacity-60"
                              : "text-foreground"
                          }
                        >
                          {topic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="text-sm font-semibold mb-2">Practice Visualizers</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.visualizers.map((viz, vizIndex) => (
                      <Link key={vizIndex} href={viz}>
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {viz.split("/").pop()?.replace("-", " ")}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
