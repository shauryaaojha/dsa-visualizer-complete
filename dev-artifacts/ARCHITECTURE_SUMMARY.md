# DSA Visualizer - Project Architecture Summary

## Generated: November 23, 2025
## Branch: improve/ui-mobile-optimization

---

## 📁 Project Structure

```
dsa-visualizer-complete/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles + dark mode support
│   ├── layout.tsx               # Root layout with Inter font
│   ├── page.tsx                 # Home page with module cards
│   ├── visualizer/
│   │   ├── page.tsx             # Algorithm listing page
│   │   └── [category]/[algorithm]/
│   │       └── page.tsx         # Dynamic visualizer page (main UI)
│   └── ...
├── components/
│   ├── layout/                  # Layout components
│   │   ├── AppShell.tsx         # Main app wrapper
│   │   ├── Navbar.tsx           # Top navigation with theme toggle
│   │   └── Sidebar.tsx          # Collapsible algorithm navigation
│   ├── ui/                      # UI primitives
│   │   ├── Button.tsx           # Styled button component
│   │   └── Card.tsx             # Card wrapper component
│   └── visualizer/              # Visualizer-specific components
│       ├── VisualizerCanvas.tsx # Main visualization renderer
│       ├── InputPanel.tsx       # Input controls
│       ├── PlaybackControls.tsx # Step navigation
│       ├── CodePanel.tsx        # Code display
│       ├── ExplanationPanel.tsx # Step explanations
│       ├── StateInspector.tsx   # Variable/metrics inspector
│       └── AnalyticsConsole.tsx # Local analytics display (NEW)
├── lib/
│   ├── algorithms/              # Algorithm implementations
│   │   ├── index.ts             # Central algorithm registry
│   │   ├── types.ts             # TypeScript types for all algorithms
│   │   ├── sorting/             # Bubble, Selection, Insertion Sort
│   │   ├── searching/           # Linear, Binary Search
│   │   ├── data-structures/     # LinkedList, Stack, Queue, BST, Heap, Hash Table, Tree
│   │   ├── graphs/              # DFS, BFS, Dijkstra
│   │   └── applications/        # Infix to Postfix, etc.
│   ├── hooks/                   # Custom React hooks (NEW)
│   │   ├── useTheme.ts          # Theme management hook
│   │   ├── useMediaQuery.ts     # Responsive media queries
│   │   └── useReducedMotion.ts  # Accessibility hook
│   └── utils/
│       ├── parseInput.ts        # Input parsing utilities
│       ├── analytics.ts         # Local analytics logging (NEW)
│       └── export.ts            # Canvas/JSON export utilities (NEW)
├── dev-artifacts/               # Build artifacts directory (NEW)
├── tailwind.config.ts           # Tailwind config with dark mode
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── next.config.mjs              # Next.js configuration
```

---

## 🔍 Algorithm Organization

### Algorithms Registry (`lib/algorithms/index.ts`)
The central registry organizes 19+ algorithms across 5 categories:

1. **Sorting** (Module 1)
   - Bubble Sort, Selection Sort, Insertion Sort

2. **Searching** (Module 1)
   - Linear Search, Binary Search

3. **Linked Lists** (Module 2)
   - Singly Linked List operations

4. **Stacks & Queues** (Module 3)
   - Stack (array), Queue (array), Circular Queue
   - Applications: Infix to Postfix

5. **Trees & Heaps** (Module 4)
   - Binary Search Tree, Tree Traversals (In/Pre/Post-order)
   - Min Heap, Hash Table

6. **Graphs** (Module 5)
   - DFS, BFS, Dijkstra's Shortest Path

### Algorithm Execution Flow

```
User Input → parseInput() → Algorithm.execute() → StepState[] → VisualizerCanvas
```

Each algorithm returns:
```typescript
{
  steps: StepState[],    // Array of visualization steps
  meta: {                // Algorithm metadata
    comparisons: number,
    swaps?: number,
    operations?: number
  }
}
```

---

## 🎨 Visualizer Mounting System

### Dynamic Route Structure
- Route: `/visualizer/[category]/[algorithm]`
- Example: `/visualizer/sorting/bubble-sort`

### Component Hierarchy
```
AppShell
  └─ Navbar (global)
  └─ Sidebar (algorithm navigation)
  └─ Main Content
       ├─ InputPanel (user inputs)
       ├─ VisualizerCanvas (visualization)
       │    ├─ ArrayVisualizer
       │    ├─ LinkedListVisualizer
       │    ├─ StackVisualizer
       │    ├─ QueueVisualizer
       │    ├─ TreeVisualizer
       │    ├─ HeapVisualizer
       │    ├─ HashTableVisualizer
       │    └─ GraphVisualizer
       ├─ PlaybackControls (step navigation)
       ├─ CodePanel (pseudocode)
       ├─ ExplanationPanel (step messages)
       └─ StateInspector (variables/metrics)
```

### Visualizer Types
Each algorithm specifies a `visualizerKind`:
- `array` - Bar chart visualization
- `linked-list` - Node chain with arrows
- `stack` - Vertical stack representation
- `queue` - Horizontal queue representation
- `tree` - Hierarchical tree layout
- `heap` - Binary tree with array representation
- `hash-table` - Hash table buckets
- `graph` - Node-edge graph layout

---

## 🎯 New Features Implemented

### 1. Dark Mode Support
- Theme toggle in Navbar (☀️/🌙)
- Persisted in localStorage
- Respects `prefers-color-scheme`
- All components support dark variants

### 2. Mobile Optimization
- Collapsible sidebar with floating toggle button
- Responsive breakpoints: 360px, 375px, 412px, 768px
- Touch targets ≥ 44px
- Mobile-first CSS with responsive spacing
- Hamburger menu in Navbar on mobile

### 3. Accessibility
- ARIA labels on all interactive elements
- `aria-live` regions for step announcements
- `aria-expanded` for collapsible elements
- Keyboard navigation support
- `prefers-reduced-motion` respect (slower animations)

### 4. Performance
- Memoized components with `useMemo` and `useCallback`
- Optimized Tailwind purging (includes `lib/` directory)
- Dynamic animation durations based on reduced motion preference
- Proper React hooks dependencies

### 5. Analytics & Export
- Local-only analytics console
- Tracks: steps, actions, errors
- Export visualization as PNG
- Export steps as JSON
- No external tracking

### 6. Custom Hooks
- `useTheme()` - Theme management
- `useMediaQuery()` - Responsive breakpoints
- `useReducedMotion()` - Accessibility preference

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.4.5
- **Styling**: Tailwind CSS 3.4.3
- **Build**: npm
- **Node**: Detected v20+

---

## 🚀 Build & Development

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

### Build Output
- Static pages: Home, visualizer listing
- Dynamic pages: Algorithm visualizers (SSR)
- Client components: Interactive visualizers
- Build time: ~30 seconds

---

## 📊 Coverage

- **19 algorithms** implemented
- **49% of planned syllabus** covered
- **5 modules** represented
- **7 visualizer types** supported

---

## 🔄 State Management

### Local State (useState)
- Input values
- Current step index
- Playback state
- UI toggles (sidebar, analytics)

### Derived State (useMemo)
- Current step object
- Algorithm configuration

### Side Effects (useEffect)
- Auto-advance playback
- Step change tracking
- Theme persistence
- Media query listeners

---

## 🎨 Design System

### Colors
- Primary: Blue (`#0ea5e9` family)
- Accent: Purple
- Status colors: Green (success), Red (error), Yellow (warning)
- Dark mode: Slate backgrounds

### Typography
- Font: Inter (Google Fonts)
- Sizes: xs (10px) → 6xl (60px)
- Code: Monospace for variables/code

### Spacing
- Base: 4px increments (0.5rem → 24rem)
- Touch targets: min 44px
- Mobile padding: 3 (12px)
- Desktop padding: 6 (24px)

---

## 🐛 Known Issues (Fixed in This Branch)

✅ TypeScript strict mode errors - Resolved by type assertions
✅ Missing dark mode support - Implemented
✅ No mobile responsiveness - Fixed with breakpoints
✅ Accessibility gaps - Added ARIA labels
✅ Build failures - All fixed, builds successfully

---

## 📝 Recommendations for Next Steps

1. **Testing**
   - Add unit tests for algorithm logic
   - E2E tests for visualizer interactions
   - Lighthouse CI integration

2. **Features**
   - Custom input via file upload
   - Preset data patterns dropdown
   - Animation speed presets
   - Comparison mode (side-by-side algorithms)

3. **Performance**
   - Add React.memo to more components
   - Implement virtual scrolling for large datasets
   - Code splitting by route

4. **Accessibility**
   - Screen reader testing
   - Keyboard shortcut documentation
   - High contrast mode

5. **Documentation**
   - Add JSDoc comments
   - Create component storybook
   - Write contributing guidelines

---

**End of Architecture Summary**
