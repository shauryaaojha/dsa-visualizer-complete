# Data Structure Visualizer (Project N)

An interactive web application for learning data structures and algorithms through visual animations and step-by-step operations. Built with Next.js 15, TypeScript, Shadcn/ui, React Flow and Framer Motion.

## 🚀 Features

### Algorithms
- **Bubble Sort**: Simple sorting algorithm with step-by-step visualization
- **Selection Sort**: Find minimum and place at beginning
- **Insertion Sort**: Build sorted array one item at a time
- **Linear Search**: Sequential search through array
- **Binary Search**: Efficient search in sorted arrays

### Data Structures
- **Linked Lists**: Singly, doubly, and circular implementations
- **Stack & Queue**: LIFO/FIFO operations with visual feedback
- **Circular Queue**: Queue that reuses empty spaces efficiently
- **Hash Table**: Linear probing for collision resolution
- **Trees**: BST and AVL with auto-balancing visualizations
- **Heap**: Min/max heap implementations with heapify animations

### Graph Algorithms
- **DFS (Depth-First Search)**: Explore as far as possible along each branch
- **BFS (Breadth-First Search)**: Explore all neighbors at current depth
- **Dijkstra's Algorithm**: Finding the shortest path between nodes

### Applications
- **Infix to Postfix Conversion**: Expression conversion using stacks
- **Message Queue System**: Producer-consumer queue simulation
- **Polynomial Multiplication**: Using linked list representation
- **Huffman Coding**: Encoding and decoding messages using a Huffman tree

## 🎨 UI Features

### Universal Visualizer Controls
Every visualizer includes:
- **Play/Pause**: Control algorithm execution
- **Previous/Next Step**: Navigate through steps manually
- **Reset**: Start over from the beginning
- **Step Progress Bar**: Visual indicator of current progress
- **Playback Speed**: Adjustable from 0.25x to 3x
- **State Inspector**: Real-time metrics (comparisons, swaps, variables)
- **Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `Left Arrow` - Previous step
  - `Right Arrow` - Next step
  - `R` - Reset

### Modern UI
- **Liquid Glass Effect**: Translucent, blurred backgrounds with soft glow
- **Pill Buttons**: Rounded, modern Apple-like buttons
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Full theme support

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Graph Visualization**: React Flow
- **UI Components**: Shadcn/ui
- **Testing**: Jest

## 📦 Getting Started (Local Development)

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd N
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
N/
├── app/                           # Next.js app router pages
│   ├── (app)/
│   │   └── visualizer/           # Visualizer pages
│   │       ├── bubble-sort/
│   │       ├── selection-sort/
│   │       ├── insertion-sort/
│   │       ├── linear-search/
│   │       ├── binary-search/
│   │       ├── circular-queue/
│   │       ├── hash-table/
│   │       ├── dfs/
│   │       ├── bfs/
│   │       └── ... (other visualizers)
│   └── page.tsx                   # Landing page
├── components/
│   ├── shared/
│   │   └── universal-visualizer-controls.tsx  # Reusable controls component
│   ├── visualizer/
│   │   ├── sorting/               # Sorting algorithm visualizers
│   │   ├── search/                # Search algorithm visualizers
│   │   ├── circular-queue/        # Circular queue visualizer
│   │   ├── hash-table/            # Hash table visualizer
│   │   ├── graph-traversal/       # DFS/BFS visualizers
│   │   └── ... (other visualizers)
│   ├── landing/                   # Landing page components
│   ├── ui/                        # shadcn/ui components
│   └── global/                    # Global components
├── lib/
│   └── algorithms/                # Algorithm generators
│       ├── bubble-sort.ts
│       ├── selection-sort.ts
│       ├── insertion-sort.ts
│       ├── linear-search.ts
│       ├── binary-search.ts
│       ├── circular-queue.ts
│       ├── hash-table.ts
│       ├── dfs.ts
│       └── bfs.ts
├── hooks/                         # Custom React hooks
├── __tests__/                     # Test files
│   ├── algorithms/                # Algorithm unit tests
│   └── smoke.test.ts              # Smoke tests
└── content/                       # Markdown content for explanations
```

## 🔧 How Visualizers Work

### Step-by-Step Generator Pattern

All algorithms use a generator function pattern that yields step snapshots:

```typescript
function* algorithmGenerator(input: any): Generator<StepSnapshot> {
  // Algorithm logic
  yield {
    state: { /* current state */ },
    highlightedIndices: [/* indices to highlight */],
    description: "What's happening now",
    metrics: { comparisons: 0, swaps: 0 }
  }
  // More steps...
}
```

### Universal Controls Component

The `UniversalVisualizerControls` component provides:
- Step navigation
- Playback controls
- Speed adjustment
- State inspection
- Keyboard shortcuts

### Adding a New Visualizer

1. **Create algorithm generator** in `lib/algorithms/`
2. **Create visualizer component** in `components/visualizer/`
3. **Create page route** in `app/(app)/visualizer/`
4. **Add to visualizer index** in `app/(app)/visualizer/page.tsx`

## 🧪 Testing

### Unit Tests
Located in `__tests__/algorithms/`, these test individual algorithm generators.

### Smoke Tests
Located in `__tests__/smoke.test.ts`, these verify all modules can be loaded.

### Running Tests
```bash
npm test
```

## 📝 Local Development Notes

- **Branch**: `feature/merge-ui-and-visualizers`
- **All changes are local only** - no remote pushes
- **Text-only UI** - no images used in visualizations
- **Fully responsive** - works on mobile and desktop

## 🎯 Testing Checklist

- [x] All visualizers load without errors
- [x] Universal controls work on all visualizers
- [x] Keyboard shortcuts function correctly
- [x] Step-by-step navigation works
- [x] Playback speed adjustment works
- [x] State inspector displays correct metrics
- [x] Responsive layout works on mobile
- [x] Dark mode works correctly

## 📦 Suggested Commit Messages

```
feat: add universal visualizer controls component
feat: implement bubble sort visualizer with step-by-step generator
feat: add selection sort and insertion sort visualizers
feat: implement linear and binary search visualizers
feat: add circular queue visualizer
feat: implement hash table with linear probing
feat: add DFS and BFS graph traversal visualizers
feat: upgrade landing page with liquid glass effect
feat: add keyboard shortcuts to all visualizers
test: add unit tests for sorting algorithms
test: add smoke tests for all visualizers
docs: update README with comprehensive documentation
```

## 🚫 Important Notes

- **NO remote pushes** - all work is local only
- **NO syncing** - changes stay in local branch
- **Text-only** - no images in UI elements
- **Local testing only** - no CI/CD integration

## 📄 License

This project is for local development and learning purposes only.
