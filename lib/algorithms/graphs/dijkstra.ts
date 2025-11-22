import { AlgorithmResult, StepState, GraphState, GraphNode, GraphEdge } from '../types';

export function dijkstraSteps(graphInput: {
    nodes: string[];
    edges: Array<[string, string, number]>;
    source: string;
}): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Create nodes with distance and parent tracking
    const nodes: GraphNode[] = graphInput.nodes.map((label, idx) => ({
        id: label,
        label,
        distance: label === graphInput.source ? 0 : Infinity,
        parent: undefined,
        x: Math.cos((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
        y: Math.sin((2 * Math.PI * idx) / graphInput.nodes.length) * 200 + 300,
    }));

    // Create weighted edges
    const edges: GraphEdge[] = graphInput.edges.map(([from, to, weight]) => ({
        from,
        to,
        weight,
        directed: false,
    }));

    // Build adjacency list with weights
    const adjacencyList: Record<string, Array<{ node: string; weight: number }>> = {};
    graphInput.nodes.forEach(node => {
        adjacencyList[node] = [];
    });
    graphInput.edges.forEach(([from, to, weight]) => {
        adjacencyList[from].push({ node: to, weight });
        adjacencyList[to].push({ node: from, weight });
    });

    steps.push({
        graph: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            type: 'weighted',
        },
        message: `Starting Dijkstra's algorithm from source node ${graphInput.source}`,
        lineNumber: 1,
        variables: { source: graphInput.source },
    });

    const visited = new Set<string>();
    const unvisited = new Set(graphInput.nodes);

    while (unvisited.size > 0) {
        // Find unvisited node with minimum distance
        let current: string | null = null;
        let minDist = Infinity;

        Array.from(unvisited).forEach(node => {
            const nodeData = nodes.find(n => n.id === node);
            if (nodeData && nodeData.distance! < minDist) {
                minDist = nodeData.distance!;
                current = node;
            }
        });

        if (!current || minDist === Infinity) break;

        operations++;
        visited.add(current);
        unvisited.delete(current);

        const currentNode = nodes.find(n => n.id === current);

        steps.push({
            graph: {
                nodes: nodes.map(n => ({
                    ...n,
                    highlight: n.id === current ? 'visiting' : visited.has(n.id) ? 'visited' : undefined,
                })),
                edges,
                type: 'weighted',
            },
            message: `Visiting node ${current} with distance ${currentNode?.distance}`,
            lineNumber: 2,
            variables: { current, distance: currentNode?.distance || 0, visited: visited.size },
        });

        // Update distances to neighbors
        const neighbors = adjacencyList[current];
        for (const { node: neighbor, weight } of neighbors) {
            if (visited.has(neighbor)) continue;

            operations++;
            const neighborNode = nodes.find(n => n.id === neighbor);
            if (!neighborNode) continue;

            const newDistance = (currentNode?.distance || 0) + weight;

            steps.push({
                graph: {
                    nodes: nodes.map(n => ({
                        ...n,
                        highlight: n.id === neighbor ? 'compare' : n.id === current ? 'visiting' : visited.has(n.id) ? 'visited' : undefined,
                    })),
                    edges: edges.map(e => ({
                        ...e,
                        highlight: (e.from === current && e.to === neighbor) || (e.to === current && e.from === neighbor) ? 'compare' : undefined,
                    })),
                    type: 'weighted',
                },
                message: `Checking neighbor ${neighbor}: current distance = ${neighborNode.distance === Infinity ? '∞' : neighborNode.distance}, new distance = ${newDistance}`,
                lineNumber: 3,
                variables: { current, neighbor, oldDist: String(neighborNode.distance === Infinity ? '∞' : neighborNode.distance), newDist: newDistance },
            });

            if (newDistance < (neighborNode.distance || Infinity)) {
                neighborNode.distance = newDistance;
                neighborNode.parent = current;

                steps.push({
                    graph: {
                        nodes: nodes.map(n => ({
                            ...n,
                            highlight: n.id === neighbor ? 'found' : n.id === current ? 'visiting' : visited.has(n.id) ? 'visited' : undefined,
                        })),
                        edges,
                        type: 'weighted',
                    },
                    message: `Updated ${neighbor}: distance = ${newDistance}, parent = ${current}`,
                    lineNumber: 4,
                    variables: { neighbor, distance: newDistance, parent: current },
                });
            }
        }
    }

    steps.push({
        graph: {
            nodes: nodes.map(n => ({ ...n, highlight: 'visited' as const })),
            edges,
            type: 'weighted',
        },
        message: `Dijkstra's algorithm complete! Shortest paths from ${graphInput.source} computed.`,
        lineNumber: 5,
    });

    return {
        steps,
        meta: { comparisons: operations, operations },
    };
}
