import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export interface GraphNode {
  id: number
  label: string
  x: number
  y: number
}

export interface GraphEdge {
  from: number
  to: number
}

export interface GraphState {
  nodes: GraphNode[]
  edges: GraphEdge[]
  visited: number[] | Set<number>
  stack?: number[]
  queue?: number[]
  current: number | null
  path: number[]
}

export function* dfsGenerator(
  state: GraphState,
  startNode: number
): Generator<StepSnapshot, void, unknown> {
  const nodes = [...state.nodes]
  const edges = [...state.edges]
  const visited = new Set<number>()
  const stack: number[] = [startNode]
  const path: number[] = []

  yield {
    state: {
      nodes,
      edges,
      visited: Array.from(visited),
      stack: [...stack],
      current: startNode,
      path: [...path],
    } as GraphState,
    description: `Starting DFS from node ${startNode}`,
    metrics: { visited: visited.size },
  }

  while (stack.length > 0) {
    const current = stack.pop()!
    
    if (visited.has(current)) {
      continue
    }

    visited.add(current)
    path.push(current)

    yield {
      state: {
        nodes,
        edges,
        visited: Array.from(visited),
        stack: [...stack],
        current,
        path: [...path],
      } as GraphState,
      description: `Visiting node ${current}`,
      metrics: { visited: visited.size },
    }

    // Get neighbors
    const neighbors = edges
      .filter(e => e.from === current || e.to === current)
      .map(e => e.from === current ? e.to : e.from)
      .filter(n => !visited.has(n))

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor)
        yield {
          state: {
            nodes,
            edges,
            visited: Array.from(visited),
            stack: [...stack],
            current,
            path: [...path],
          } as GraphState,
          description: `Adding neighbor ${neighbor} to stack`,
          metrics: { visited: visited.size },
        }
      }
    }
  }

  yield {
    state: {
      nodes,
      edges,
      visited: Array.from(visited),
      stack: [],
      current: null,
      path: [...path],
    } as GraphState,
    description: `DFS complete! Visited ${visited.size} nodes. Path: ${path.join(" → ")}`,
    metrics: { visited: visited.size },
  }
}

