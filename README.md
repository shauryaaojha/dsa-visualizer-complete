# DSA Visualizer - Complete Course Edition

## 🎓 Comprehensive Data Structures & Algorithms Visualizer
**Course: DATA STRUCTURES AND ALGORITHMS (21CSC201J)**  
**Institute: SRM Institute of Science and Technology**  
**Semester: ODD 2025-26**

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Server runs on **http://localhost:3000** (or next available port like 3001)

---

## 📚 Complete Algorithm Coverage

### ✅ Module 1: Algorithms & Complexity (5 Algorithms)
**Sorting Algorithms:**
- Bubble Sort - Optimized with early termination
- Selection Sort - Minimum selection approach
- Insertion Sort - Incremental sorted build

**Searching Algorithms:**
- Linear Search - Sequential scanning
- Binary Search - Divide and conquer (requires sorted array)

### ✅ Module 2: Arrays & Linked Lists (1 Data Structure)
- **Singly Linked List** (Exercise 5)
  - Insert at beginning
  - Insert at end  
  - Delete from beginning
  - Search operation
  - Visual node chain with arrows

### ✅ Module 3: Stacks & Queues (4 Data Structures + Applications)
**Data Structures:**
- **Stack (Array)** (Exercise 7) - LIFO with push/pop/peek
- **Queue (Array)** (Exercise 8) - FIFO with enqueue/dequeue
- **Circular Queue** - Efficient space utilization
- **Priority Queue** - Coming soon

**Applications:**
- **Infix to Postfix** (Exercise 9) - Expression conversion using stack
- Postfix Evaluation - Coming soon
- Parentheses Balancing - Coming soon
- Tower of Hanoi - Coming soon

### ✅ Module 4: Trees, Heaps & Hashing (6 Visualizers)
**Binary Trees:**
- **Binary Search Tree** (Exercise 11) - Insert, Search, Delete
- **Tree Traversals** (Exercise 10):
  - Inorder Traversal
  - Preorder Traversal
  - Postorder Traversal

**Heaps:**
- **Min Heap** - Insert with heapify-up, Extract-min with heapify-down
- Max Heap - Coming soon

**Hashing:**
- **Hash Table** - Linear probing collision resolution
- Chaining - Coming soon
- Double Hashing - Coming soon

### ✅ Module 5: Graph Algorithms (3 Algorithms)
- **Depth-First Search (DFS)** (Exercise 13) - Stack-based traversal
- **Breadth-First Search (BFS)** (Exercise 13) - Queue-based level-order
- **Dijkstra's Shortest Path** (Exercise 14) - Weighted graph shortest paths

**Coming Soon:**
- Prim's MST
- Kruskal's MST  
- Topological Sort
- Floyd-Warshall

---

## 📊 Statistics

| Category | Implemented | Total Planned |
|----------|-------------|---------------|
| **Sorting** | 3 | 5 |
| **Searching** | 2 | 3 |
| **Linked Lists** | 1 | 3 |
| **Stacks** | 1 | 1 |
| **Queues** | 2 | 4 |
| **Trees** | 4 | 6 |
| **Heaps** | 1 | 2 |
| **Hashing** | 1 | 3 |
| **Graphs** | 3 | 7 |
| **Applications** | 1 | 5 |
| **TOTAL** | **19** | **39** |

**Current Coverage: ~49% of full syllabus**

---

## ✨ Features

### 🎬 Interactive Visualizations
- **Step-by-Step Execution** - Watch every operation in detail
- **Playback Controls** - Play, pause, forward, backward, speed control (0.25x - 3x)
- **8 Visualizer Types**:
  - Array bars with height-based values
  - Linked list chains with arrows
  - Stack vertical LIFO structure
  - Queue horizontal FIFO display
  - Tree hierarchical nodes
  - Heap array representation
  - Hash table bucket grid
  - Graph circular layout with edges

### 💻 Code Synchronization
- **Real-time highlighting** - See which line is executing
- **Pseudocode display** - Algorithm logic in readable format
- **Line-by-line tracking** - Current execution pointer

### 📊 State Monitoring
- **Variable Inspector** - Track i, j, top, front, rear, etc.
- **Algorithm Metrics** - Comparisons, swaps, operations count
- **Step Counter** - Current step / Total steps

### 🎨 Visual Excellence
- **Color-coded highlights** - Different colors for compare, swap, found, visiting, etc.
- **Smooth animations** - Transition effects between steps
- **Responsive design** - Works on all screen sizes
- **Module badges** - Shows module number and exercise number

---

## 📁 Project Structure

```
DS Visualizer/
├── app/
│   ├── page.tsx                              # Home page with modules
│   ├── layout.tsx                            # Root layout
│   ├── globals.css                           # Global styles
│   └── visualizer/
│       ├── page.tsx                          # Module overview
│       └── [category]/[algorithm]/page.tsx   # Main visualizer
├── components/
│   ├── ui/
│   │   ├── Button.tsx                        # Reusable button
│   │   └── Card.tsx                          # Card wrapper
│   ├── layout/
│   │   ├── Navbar.tsx                        # Top navigation
│   │   ├── Sidebar.tsx                       # Module-based sidebar
│   │   └── AppShell.tsx                      # Layout wrapper
│   └── visualizer/
│       ├── VisualizerCanvas.tsx              # Multi-type renderer
│       ├── InputPanel.tsx                    # Dynamic input handling
│       ├── PlaybackControls.tsx              # Step controls
│       ├── CodePanel.tsx                     # Code highlighting
│       ├── ExplanationPanel.tsx              # Step explanations
│       └── StateInspector.tsx                # Variable tracking
└── lib/
    ├── algorithms/
    │   ├── types.ts                          # TypeScript definitions
    │   ├── index.ts                          # Algorithm registry
    │   ├── sorting/                          # Sorting algorithms
    │   ├── searching/                        # Search algorithms
    │   ├── data-structures/                  # DS implementations
    │   ├── graphs/                           # Graph algorithms
    │   └── applications/                     # Stack/Queue apps
    └── utils/
        └── parseInput.ts                     # Input parsing
```

---

## 🎯 How to Use

### 1. Navigate to Algorithm
- Use **Sidebar** to browse by module
- Click on any algorithm to open visualizer
- See module number and exercise number tags

### 2. Provide Input
- **Arrays**: Enter numbers like `10 3 5 1 8`
- **Target**: For search algorithms
- **Operations**: Select from dropdown for data structures
- **Custom**: Some use default inputs (graphs, trees)

### 3. Run Visualization
- Click **"Run"** button
- Use **Playback Controls**:
  - ⏮ Reset to start
  - ⏪ Previous step
  - ▶️ Play/Pause auto-advance
  - ⏩ Next step
  - 🎚️ Speed slider (0.25x to 3x)

### 4. Learn from Output
- **Watch** visual representation update
- **Read** code panel with highlighting
- **Follow** explanation messages
- **Track** variables in state inspector

---

## 🎓 Course Alignment

### Direct Exercise Mapping
- **Exercise 5**: Singly Linked List operations
- **Exercise 7**: Stack (Array) operations
- **Exercise 8**: Queue operations
- **Exercise 9**: Infix to Postfix conversion
- **Exercise 10**: Tree traversals
- **Exercise 11**: Binary Search Tree
- **Exercise 13**: DFS and BFS
- **Exercise 14**: Dijkstra's shortest path

### Learning Outcomes Supported
✅ **LO1**: Analyze time and space complexity  
✅ **LO2**: Design sorting and searching algorithms  
✅ **LO3**: Implement linear data structures  
✅ **LO4**: Apply non-linear data structures  
✅ **LO5**: Solve real-world problems using DSA

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Visualization**: Custom React components
- **Icons**: SVG-based

---

## 🔮 Future Enhancements

### High Priority
- [ ] Merge Sort & Quick Sort
- [ ] AVL Tree with rotations
- [ ] B-Tree operations
- [ ] Prim's and Kruskal's MST
- [ ] More stack/queue applications

### Medium Priority
- [ ] Doubly Linked List
- [ ] Circular Linked List  
- [ ] Max Heap
- [ ] Hash table chaining
- [ ] Topological sort

### Low Priority
- [ ] Radix Sort
- [ ] Heap Sort
- [ ] Red-Black Trees
- [ ] Trie data structure
- [ ] Segment Trees

---

## 📝 License

Educational project for SRM University students.

---

## 👨‍💻 Development

**Version**: 3.0 - Expanded Edition  
**Last Updated**: November 2025  
**Status**: Active Development

Built with ❤️ for DSA learners at SRM University!

---

## 🎉 Current Milestone

**19 Algorithms Implemented Across All 5 Modules!**

The visualizer now covers approximately **49% of the complete course syllabus** with comprehensive visualizations for fundamental algorithms and data structures.

Perfect for:
- **Lab Practice** - Visual aid for exercises
- **Exam Preparation** - Step-by-step understanding
- **Concept Learning** - Interactive demonstrations
- **Assignment Help** - See how algorithms work

---

**Ready to explore? Open http://localhost:3000 and start learning! 🚀**
