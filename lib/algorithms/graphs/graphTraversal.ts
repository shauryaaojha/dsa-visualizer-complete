import { AlgorithmResult, StepState, GraphState, GraphNode, GraphEdge } from '../types';

export function dfsSteps(graphInput: { nodes: string[]; edges: [string, string][] }): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Create nodes
    const nodes: GraphNode[] = graphInput.nodes.map((label, idx) => ({
        id: label,
        label,
        x: Math.cos((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
        y: Math.sin((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
    }));

    // Create edges
    const edges: GraphEdge[] = graphInput.edges.map(([from, to]) => ({
        from,
        to,
        directed: false,
    }));

    // Build adjacency list
    const adjacencyList: Record<string, string[]> = {};
    graphInput.nodes.forEach(node => {
        adjacencyList[node] = [];
    });
    graphInput.edges.forEach(([from, to]) => {
        adjacencyList[from].push(to);
        adjacencyList[to].push(from);
    });

    steps.push({
        graph: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            adjacencyList,
            type: 'undirected',
        },
        message: 'Starting Depth-First Search (DFS) traversal',
        lineNumber: 1,
    });

    const visited = new Set<string>();
    const stack: string[] = [graphInput.nodes[0]];
    const traversalOrder: string[] = [];

    while (stack.length > 0) {
        const current = stack.pop()!;
        operations++;

        if (visited.has(current)) continue;

        visited.add(current);
        traversalOrder.push(current);

        const highlightedNodes = nodes.map(n => ({
            ...n,
            highlight: n.id === current ? ('visiting' as const) :
                visited.has(n.id) ? ('visited' as const) : undefined,
        }));

        steps.push({
            graph: {
                nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                edges: JSON.parse(JSON.stringify(edges)),
                adjacencyList,
                type: 'undirected',
            },
            message: `Visiting node ${current}. Traversal order: ${traversalOrder.join(' → ')}`,
            lineNumber: 2,
            variables: { current, visited: visited.size },
        });

        // Add unvisited neighbors to stack
        const neighbors = adjacencyList[current].filter(n => !visited.has(n));

        if (neighbors.length > 0) {
            steps.push({
                graph: {
                    nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                    edges: JSON.parse(JSON.stringify(edges)),
                    adjacencyList,
                    type: 'undirected',
                },
                message: `Pushing unvisited neighbors to stack: ${neighbors.join(', ')}`,
                lineNumber: 3,
            });
        }

        neighbors.reverse().forEach(neighbor => stack.push(neighbor));
    }

    const finalNodes = nodes.map(n => ({
        ...n,
        highlight: ('visited' as const),
    }));

    steps.push({
        graph: {
            nodes: finalNodes,
            edges,
            adjacencyList,
            type: 'undirected',
        },
        message: `DFS Complete! Traversal order: ${traversalOrder.join(' → ')}`,
        lineNumber: 4,
        variables: { totalNodes: visited.size },
    });

    return {
        steps,
        meta: { comparisons: operations, operations },
    };
}

export function bfsSteps(graphInput: { nodes: string[]; edges: [string, string][] }): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Create nodes
    const nodes: GraphNode[] = graphInput.nodes.map((label, idx) => ({
        id: label,
        label,
        x: Math.cos((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
        y: Math.sin((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
    }));

    // Create edges
    const edges: GraphEdge[] = graphInput.edges.map(([from, to]) => ({
        from,
        to,
        directed: false,
    }));

    // Build adjacency list
    const adjacencyList: Record<string, string[]> = {};
    graphInput.nodes.forEach(node => {
        adjacencyList[node] = [];
    });
    graphInput.edges.forEach(([from, to]) => {
        adjacencyList[from].push(to);
        adjacencyList[to].push(from);
    });

    steps.push({
        graph: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            adjacencyList,
            type: 'undirected',
        },
        message: 'Starting Breadth-First Search (BFS) traversal',
        lineNumber: 1,
    });

    const visited = new Set<string>();
    const queue: string[] = [graphInput.nodes[0]];
    const traversalOrder: string[] = [];
    visited.add(graphInput.nodes[0]);

    while (queue.length > 0) {
        const current = queue.shift()!;
        operations++;
        traversalOrder.push(current);

        const highlightedNodes = nodes.map(n => ({
            ...n,
            highlight: n.id === current ? ('visiting' as const) :
                visited.has(n.id) ? ('visited' as const) : undefined,
        }));

        steps.push({
            graph: {
                nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                edges: JSON.parse(JSON.stringify(edges)),
                adjacencyList,
                type: 'undirected',
            },
            message: `Visiting node ${current}. Traversal order: ${traversalOrder.join(' → ')}`,
            lineNumber: 2,
            variables: { current, visited: visited.size },
        });

        // Add unvisited neighbors to queue
        const neighbors = adjacencyList[current].filter(n => !visited.has(n));

        if (neighbors.length > 0) {
            steps.push({
                graph: {
                    nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                    edges: JSON.parse(JSON.stringify(edges)),
                    adjacencyList,
                    type: 'undirected',
                },
                message: `Enqueuing unvisited neighbors: ${neighbors.join(', ')}`,
                lineNumber: 3,
            });
        }

        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }

    const finalNodes = nodes.map(n => ({
        ...n,
        highlight: ('visited' as const),
    }));

    steps.push({
        graph: {
            nodes: finalNodes,
            edges,
            adjacencyList,
            type: 'undirected',
        },
        message: `BFS Complete! Traversal order: ${traversalOrder.join(' → ')}`,
        lineNumber: 4,
        variables: { totalNodes: visited.size },
    });

    return {
        steps,
        meta: { comparisons: operations, operations },
    };
}
