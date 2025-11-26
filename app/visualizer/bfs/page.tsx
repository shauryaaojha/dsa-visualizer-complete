import { GraphTraversalVisualizer } from "@/components/visualizer/graph-traversal/graph-traversal-visualizer"

export default function BFSPage() {
  return (
    <GraphTraversalVisualizer
      algorithm="bfs"
      title="Breadth-First Search (BFS)"
      content={
        <div>
          <h2>Breadth-First Search (BFS)</h2>
          <p>
            BFS is a graph traversal algorithm that explores all neighbors at the current depth
            before moving to nodes at the next depth level. It uses a queue to keep track of nodes to visit.
          </p>
          <h3>Algorithm</h3>
          <ol>
            <li>Start from the selected node</li>
            <li>Add it to the queue and mark as visited</li>
            <li>While queue is not empty, dequeue a node and visit all its unvisited neighbors</li>
            <li>Add unvisited neighbors to the queue</li>
          </ol>
          <h3>Time Complexity</h3>
          <p>O(V + E) where V is vertices and E is edges</p>
        </div>
      }
    />
  )
}

