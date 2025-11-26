import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { BrainCircuit, Binary, TreePine, Box, List, ArrowLeftRight, Calculator, MessageSquare, Hash, ArrowRightLeft, Search, ArrowUpDown, Network } from "lucide-react"
import Link from "next/link"

const sections = {
  algorithms: [
    {
      name: "Bubble Sort",
      description: "Simple sorting algorithm that repeatedly compares adjacent elements and swaps them if needed.",
      href: "/visualizer/bubble-sort",
      icon: ArrowUpDown,
    },
    {
      name: "Selection Sort",
      description: "Sorting algorithm that finds the minimum element and places it at the beginning.",
      href: "/visualizer/selection-sort",
      icon: ArrowUpDown,
    },
    {
      name: "Insertion Sort",
      description: "Sorting algorithm that builds the sorted array one item at a time.",
      href: "/visualizer/insertion-sort",
      icon: ArrowUpDown,
    },
    {
      name: "Linear Search",
      description: "Simple search algorithm that checks each element sequentially until found.",
      href: "/visualizer/linear-search",
      icon: Search,
    },
    {
      name: "Binary Search",
      description: "Efficient search algorithm for sorted arrays using divide and conquer.",
      href: "/visualizer/binary-search",
      icon: Search,
    },
  ],
  dataStructures: [
    {
      name: "Linked List",
      description: "Dynamic data structure with nodes connected through references. Explore different types of linked lists.",
      href: "/visualizer/linked-list",
      icon: List,
    },
    {
      name: "Stack",
      description: "LIFO data structure supporting push and pop operations. Visualize stack operations and state.",
      href: "/visualizer/stack",
      icon: ArrowLeftRight,
    },
    {
      name: "Queue",
      description: "FIFO data structure for managing ordered elements. See enqueue and dequeue in action.",
      href: "/visualizer/queue",
      icon: ArrowLeftRight,
    },
    {
      name: "Circular Queue",
      description: "A queue that reuses empty spaces efficiently by wrapping around.",
      href: "/visualizer/circular-queue",
      icon: ArrowLeftRight,
    },
    {
      name: "Hash Table",
      description: "Hash table with linear probing for collision resolution.",
      href: "/visualizer/hash-table",
      icon: Hash,
    },
    {
      name: "Binary Search Tree",
      description: "A binary tree that maintains sorted data with O(log n) operations. Learn about tree traversals.",
      href: "/visualizer/binary-tree",
      icon: Binary,
    },
    {
      name: "AVL Tree",
      description: "Self-balancing BST that maintains height balance. Visualize rotations and balancing.",
      href: "/visualizer/avl-tree",
      icon: TreePine,
    },
    {
      name: "Heap",
      description: "Complete binary tree with heap property. Switch between min and max heaps.",
      href: "/visualizer/heap",
      icon: Box,
    },
  ],
  graphs: [
    {
      name: "DFS",
      description: "Depth-First Search: Explore as far as possible along each branch before backtracking.",
      href: "/visualizer/dfs",
      icon: Network,
    },
    {
      name: "BFS",
      description: "Breadth-First Search: Explore all neighbors at current depth before moving to next level.",
      href: "/visualizer/bfs",
      icon: Network,
    },
    {
      name: "Dijkstra's Algorithm",
      description: "Visualize Dijkstra's algorithm to find the shortest path in a graph.",
      href: "/visualizer/dijkstra",
      icon: ArrowRightLeft,
    },
  ],
  applications: [
    {
      name: "Infix to Postfix",
      description: "Convert infix expressions to postfix notation using stacks. Step through the conversion process.",
      href: "/visualizer/stack-applications",
      icon: Calculator,
    },
    {
      name: "Message Queue",
      description: "Simulate message queuing systems with producers and consumers. Visualize message flow.",
      href: "/visualizer/queue-applications",
      icon: MessageSquare,
    },
    {
      name: "Polynomial Multiplication",
      description: "Visualize polynomial multiplication using linked lists. See term-by-term multiplication steps.",
      href: "/visualizer/polynomial",
      icon: Calculator,
    },
    {
      name: "Huffman Coding",
      description: "Huffman coding is a popular data compression technique that creates variable-length prefix codes based on the frequency of characters in the input text.",
      href: "/visualizer/huffman",
      icon: Hash,
    },
  ]
}

export default function HomePage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/20 border-2 border-primary/30 backdrop-blur-sm">
            <BrainCircuit className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight gradient-text">
            Algorithm Visualizer Hub
          </h1>
        </div>
        <p className="text-muted-foreground text-xl max-w-3xl font-medium">
          Interactive visualizations to help you understand data structures and algorithms.
          Explore, learn, and see how they work in real-time with step-by-step execution.
        </p>
      </div>

      <div className="space-y-12">
        {/* Algorithms Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tight">Algorithms</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-accent to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.algorithms.map((algo) => {
              const Icon = algo.icon
              return (
                <Link key={algo.href} href={algo.href}>
                  <Card className="h-full liquid-glass hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{algo.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{algo.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Data Structures Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tight">Data Structures</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.dataStructures.map((ds) => {
              const Icon = ds.icon
              return (
                <Link key={ds.href} href={ds.href}>
                  <Card className="h-full liquid-glass hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-accent/20 border border-accent/30 group-hover:bg-accent/30 transition-colors">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <CardTitle className="text-xl">{ds.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{ds.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Graphs Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tight">Graph Algorithms</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.graphs.map((graph) => {
              const Icon = graph.icon
              return (
                <Link key={graph.href} href={graph.href}>
                  <Card className="h-full liquid-glass hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 group-hover:bg-purple-500/30 transition-colors">
                          <Icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <CardTitle className="text-xl">{graph.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{graph.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Applications Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
            <h2 className="text-3xl font-black tracking-tight">Applications</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.applications.map((app) => {
              const Icon = app.icon
              return (
                <Link key={app.href} href={app.href}>
                  <Card className="h-full liquid-glass hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 group-hover:bg-yellow-500/30 transition-colors">
                          <Icon className="h-5 w-5 text-yellow-400" />
                        </div>
                        <CardTitle className="text-xl">{app.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">{app.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}