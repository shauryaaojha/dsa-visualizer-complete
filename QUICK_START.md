# 🚀 Quick Start Guide - DSA Visualizer

## Getting Started in 30 Seconds

### 1. Server is Already Running! ✅
Your development server is live at:
```
http://localhost:3001
```

### 2. Open in Browser
Just navigate to the URL above and you'll see:
- **Home Page** - Overview of all 5 modules
- **Visualizer Page** - All algorithms organized by module

### 3. Try Your First Visualization

**Option A: Bubble Sort**
1. Click "Visualizer" in navbar
2. Under "Module 1", click "Bubble Sort"
3. Default input is already there (10 3 5 1 8 2)
4. Click **"Run"**
5. Use playback controls to step through!

**Option B: Linked List**
1. Go to "Module 2: Arrays & Linked Lists"
2. Click "Singly Linked List"
3. Select operation (insert-beginning, insert-end, etc.)
4. Enter a value
5. Click **"Run"** and watch!

**Option C: Graph Traversal**
1. Go to "Module 5: Graph Algorithms"
2. Click "Depth-First Search (DFS)" or "BFS"
3. Uses default graph - just click **"Run"**
4. Watch the traversal animation!

---

## 🎮 Using the Controls

### Input Panel
- **Array Input**: Enter numbers like "10 3 5 1 8"
- **Target** (for search): Single number
- **Operation** (for data structures): Select from dropdown
- **Value**: For insert/push operations

### Playback Controls
- ⏮ **Reset**: Go to first step
- ⏪ **Previous**: Go back one step
- ▶️ **Play/Pause**: Auto-play through steps
- ⏩ **Next**: Advance one step
- **Speed Slider**: Adjust from 0.25x to 3x

### What You'll See
- **Visualization**: Animated data structure
- **Code Panel**: Highlighted pseudocode
- **Explanation**: What's happening now
- **State Inspector**: Variable values and metrics

---

## 📚 What's Available Now

### ✅ Currently Implemented (10 Visualizers)

| Module | Name | Type | What It Does |
|--------|------|------|--------------|
| 1 | Bubble Sort | Sorting | Swap adjacent elements |
| 1 | Selection Sort | Sorting | Find min and move to front |
| 1 | Insertion Sort | Sorting | Insert into sorted portion |
| 1 | Linear Search | Searching | Check each element |
| 1 | Binary Search | Searching | Divide and conquer |
| 2 | Singly Linked List | Data Structure | Insert, delete, search |
| 3 | Stack (Array) | Data Structure | Push, pop, peek |
| 4 | Binary Search Tree | Data Structure | Insert, search in BST |
| 5 | DFS | Graph | Depth-first traversal |
| 5 | BFS | Graph | Breadth-first traversal |

---

## 🎯 Quick Examples

### Example 1: Visualize Selection Sort
```
1. Go to /visualizer/sorting/selection-sort
2. Input: 64 25 12 22 11
3. Click "Run"
4. Watch it find minimum in each pass!
```

### Example 2: Binary Search
```
1. Go to /visualizer/searching/binary-search
2. Array: 10 20 30 40 50 60 70
3. Target: 40
4. Click "Run"
5. See how it narrows search space!
```

### Example 3: Stack Operations
```
1. Go to /visualizer/stacks-queues/stack-array
2. Automatically runs push/pop sequence
3. Click "Run"
4. Watch LIFO in action!
```

### Example 4: BST Insert
```
1. Go to /visualizer/trees/binary-search-tree
2. Operation: insert
3. Value: 25
4. Click "Run"
5. See where it gets inserted!
```

### Example 5: Graph BFS
```
1. Go to /visualizer/graphs/bfs
2. Uses default graph (A-B-C-D-E)
3. Click "Run"
4. Watch level-by-level traversal!
```

---

## 🔧 Troubleshooting

### Server Not Running?
```bash
cd "c:\Users\shaur\OneDrive\Documents\DS Visualizer"
npm run dev
```

### Port 3000 In Use?
- App automatically uses next available port (3001, 3002, etc.)
- Check terminal output for actual port

### TypeScript Errors?
- Already handled! All types are properly defined
- If you see errors, try: `npm install`

---

## 📖 Learning Tips

1. **Start Simple**: Begin with Bubble Sort
2. **Compare**: Try all 3 sorting algorithms on same input
3. **Slow Down**: Use 0.5x speed for detailed learning
4. **Read Code**: Watch the code panel highlighting
5. **Track Variables**: Monitor the state inspector

---

## 🎓 Course Alignment

This visualizer covers:
- ✅ **All 5 Modules** of 21CSC201J
- ✅ **Exercise Labs**: Ex.5, Ex.7, Ex.11, Ex.13
- ✅ **Learning Outcomes**: Algorithm design, data structure selection, problem solving

---

## 🚀 Next Steps

**Your visualizer is ready!**
1. Open http://localhost:3001
2. Explore each module
3. Try different inputs
4. Learn by visualizing!

**Happy Learning! 🎉**
