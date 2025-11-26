import { GraphTraversalVisualizer } from "@/components/visualizer/graph-traversal/graph-traversal-visualizer"

export default function DFSPage() {
  return (
    <GraphTraversalVisualizer
      algorithm="dfs"
      title="Depth-First Search (DFS)"
      content={
        <div>
          <h2>Depth-First Search (DFS)</h2>
          <p>
            DFS is a graph traversal algorithm that explores as far as possible along each branch
            before backtracking. It uses a stack (or recursion) to keep track of nodes to visit.
          </p>
          <h3>Algorithm</h3>
          <ol>
            <li>Start from the selected node</li>
            <li>Mark it as visited</li>
            <li>For each unvisited neighbor, recursively perform DFS</li>
            <li>Backtrack when no more unvisited neighbors exist</li>
          </ol>
          <h3>Time Complexity</h3>
          <p>O(V + E) where V is vertices and E is edges</p>
        </div>
      }
    />
  )
}

