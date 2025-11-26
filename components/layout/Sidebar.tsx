import {
  BookOpen,
  ArrowUpDown,
  Search,
  SquareStack,
  SquareChevronLeft,
  CircleDot,
  List,
  Hash,
  Binary,
  TreePine,
  Database,
  Network,
  ArrowRightLeft,
  MessageSquare,
  Equal,
  X,
  BrainCircuit,
} from "lucide-react"

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"

const navItems = [
  {
    title: "Visualizer",
    url: "/visualizer",
    icon: BrainCircuit,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/visualizer",
      },
    ],
  },
  {
    title: "Curriculum",
    url: "/curriculum",
    icon: BookOpen,
  },
]

const algorithms = [
  {
    name: "Bubble Sort",
    url: "/visualizer/bubble-sort",
    icon: ArrowUpDown,
    description: "Simple sorting algorithm with step-by-step visualization",
  },
  {
    name: "Selection Sort",
    url: "/visualizer/selection-sort",
    icon: ArrowUpDown,
    description: "Find minimum and place at beginning",
  },
  {
    name: "Insertion Sort",
    url: "/visualizer/insertion-sort",
    icon: ArrowUpDown,
    description: "Build sorted array one item at a time",
  },
  {
    name: "Linear Search",
    url: "/visualizer/linear-search",
    icon: Search,
    description: "Sequential search through array",
  },
  {
    name: "Binary Search",
    url: "/visualizer/binary-search",
    icon: Search,
    description: "Efficient search in sorted arrays",
  },
]

const dataStructures = [
  {
    name: "Stack",
    url: "/visualizer/stack",
    icon: SquareStack,
    description: "LIFO data structure with push and pop operations",
  },
  {
    name: "Queue",
    url: "/visualizer/queue",
    icon: SquareChevronLeft,
    description: "FIFO data structure with enqueue and dequeue operations",
  },
  {
    name: "Circular Queue",
    url: "/visualizer/circular-queue",
    icon: CircleDot,
    description: "Queue that reuses empty spaces efficiently",
  },
  {
    name: "Linked List",
    url: "/visualizer/linked-list",
    icon: List,
    description: "Linear data structure with elements linked using pointers",
  },
  {
    name: "Hash Table",
    url: "/visualizer/hash-table",
    icon: Hash,
    description: "Hash table with linear probing for collision resolution",
  },
  {
    name: "Binary Search Tree",
    url: "/visualizer/binary-tree",
    icon: Binary,
    description: "Basic binary tree with BST properties",
  },
  {
    name: "AVL Tree",
    url: "/visualizer/avl-tree",
    icon: TreePine,
    description: "Self-balancing binary search tree",
  },
  {
    name: "Heap",
    url: "/visualizer/heap",
    icon: Database,
    description: "Binary heap implementation with max/min heap variants",
  },
]

const graphAlgorithms = [
  {
    name: "DFS",
    url: "/visualizer/dfs",
    icon: Network,
    description: "Depth-First Search: Explore as far as possible along each branch",
  },
  {
    name: "BFS",
    url: "/visualizer/bfs",
    icon: Network,
    description: "Breadth-First Search: Explore all neighbors at current depth",
  },
  {
    name: "Dijkstra's Algorithm",
    url: "/visualizer/dijkstra",
    icon: ArrowRightLeft,
    description: "Find the shortest path between nodes in a graph",
  },
]

const applications = [
  {
    name: "Message Queue",
    url: "/visualizer/queue-applications",
    icon: MessageSquare,
    description: "Asynchronous message processing system with producers and consumers",
  },
  {
    name: "Infix to Postfix Conversion",
    url: "/visualizer/stack-applications",
    icon: Equal,
    description: "Convert infix expressions to postfix notation using a stack",
  },
  {
    name: "Polynomial Multiplication",
    url: "/visualizer/polynomial",
    icon: X,
    description: "Multiply two polynomials using linked lists",
  },
  {
    name: "Huffman Coding",
    url: "/visualizer/huffman",
    icon: Hash,
    description: "Huffman coding is a popular data compression technique that creates variable-length prefix codes based on the frequency of characters in the input text.",
  },
]

export function Sidebar() {
  return (
    <UISidebar>
      <SidebarHeader>
        <div className="px-6 py-5 border-b-2 border-primary/20 flex items-center gap-3 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-sm font-black gradient-text">Algorithm Hub</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects
          title="Algorithms"
          projects={algorithms.map(algo => ({
            name: algo.name,
            url: algo.url,
            icon: algo.icon,
            description: algo.description,
          }))}
        />
        <NavProjects
          title="Data Structures"
          projects={dataStructures.map(ds => ({
            name: ds.name,
            url: ds.url,
            icon: ds.icon,
            description: ds.description,
          }))}
        />
        <NavProjects
          title="Graph Algorithms"
          projects={graphAlgorithms.map(graph => ({
            name: graph.name,
            url: graph.url,
            icon: graph.icon,
            description: graph.description,
          }))}
        />
        <NavProjects
          title="Applications"
          projects={applications.map(app => ({
            name: app.name,
            url: app.url,
            icon: app.icon,
            description: app.description,
          }))}
        />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser
          user={{
            name: "Guest User",
            email: "guest@example.com",
            avatar: "",
          }}
        />
      </SidebarFooter> */}
      <SidebarRail />
    </UISidebar>
  )
}