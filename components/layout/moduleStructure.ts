import { BookOpen, GitGraph, Layers, Layout, Network, Share2, SquareStack, Database, List, Search, ArrowRightLeft, Binary, Activity, Link } from "lucide-react"

export type ModuleId =
    | "sorting"
    | "stack"
    | "queue"
    | "linked-list"
    | "heap"
    | "dijkstra"
    | "avl-tree"
    | "binary-tree"
    | "search"

export interface Module {
    id: ModuleId
    title: string
    description: string
    icon: any
    href: string
}

export const modules: Module[] = [
    {
        id: "sorting",
        title: "Sorting Algorithms",
        description: "Visualize bubble, selection, and insertion sort",
        icon: ArrowRightLeft,
        href: "/visualizer/sorting",
    },
    {
        id: "stack",
        title: "Stack",
        description: "LIFO data structure operations",
        icon: Layers,
        href: "/visualizer/stack",
    },
    {
        id: "queue",
        title: "Queue",
        description: "FIFO data structure operations",
        icon: SquareStack,
        href: "/visualizer/queue",
    },
    {
        id: "linked-list",
        title: "Linked List",
        description: "Singly and doubly linked lists",
        icon: Link,
        href: "/visualizer/linked-list",
    },
    {
        id: "heap",
        title: "Heap",
        description: "Min and max heap operations",
        icon: Database,
        href: "/visualizer/heap",
    },
    {
        id: "dijkstra",
        title: "Dijkstra's Algorithm",
        description: "Shortest path in weighted graphs",
        icon: Network,
        href: "/visualizer/dijkstra",
    },
    {
        id: "avl-tree",
        title: "AVL Tree",
        description: "Self-balancing binary search tree",
        icon: GitGraph,
        href: "/visualizer/avl-tree",
    },
    {
        id: "binary-tree",
        title: "Binary Tree",
        description: "Basic binary tree operations",
        icon: Binary,
        href: "/visualizer/binary-tree",
    },
    {
        id: "search",
        title: "Search Algorithms",
        description: "Linear and binary search",
        icon: Search,
        href: "/visualizer/search",
    },
]
