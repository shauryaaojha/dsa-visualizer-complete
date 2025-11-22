import { AlgorithmResult, StepState, TreeState, TreeNode } from '../types';

export function treeTraversalSteps(traversalType: 'inorder' | 'preorder' | 'postorder'): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Build sample binary tree
    const nodes: TreeNode[] = [
        { id: 'node-50', value: 50 },
        { id: 'node-30', value: 30 },
        { id: 'node-70', value: 70 },
        { id: 'node-20', value: 20 },
        { id: 'node-40', value: 40 },
        { id: 'node-60', value: 60 },
        { id: 'node-80', value: 80 },
    ];

    // Set parent-child relationships
    nodes[0].left = 'node-30';
    nodes[0].right = 'node-70';
    nodes[1].left = 'node-20';
    nodes[1].right = 'node-40';
    nodes[2].left = 'node-60';
    nodes[2].right = 'node-80';

    const root = 'node-50';
    const traversalOrder: number[] = [];

    steps.push({
        tree: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            root,
            type: 'binary',
        },
        message: `Starting ${traversalType.toUpperCase()} traversal of binary tree`,
        lineNumber: 1,
    });

    const traverse = (nodeId: string | undefined, depth: number = 0) => {
        if (!nodeId) return;

        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        operations++;

        if (traversalType === 'preorder') {
            // Visit root first
            traversalOrder.push(node.value);
            steps.push({
                tree: {
                    nodes: nodes.map(n => ({
                        ...n,
                        highlight: n.id === nodeId ? 'visiting' : traversalOrder.includes(n.value) ? 'visited' : undefined,
                    })),
                    root,
                    type: 'binary',
                },
                message: `Preorder: Visit node ${node.value}. Order so far: [${traversalOrder.join(', ')}]`,
                lineNumber: 2,
                variables: { current: node.value, depth, order: traversalOrder.join(',') },
            });

            traverse(node.left, depth + 1);
            traverse(node.right, depth + 1);
        } else if (traversalType === 'inorder') {
            // Visit left subtree first
            traverse(node.left, depth + 1);

            // Visit root
            traversalOrder.push(node.value);
            steps.push({
                tree: {
                    nodes: nodes.map(n => ({
                        ...n,
                        highlight: n.id === nodeId ? 'visiting' : traversalOrder.includes(n.value) ? 'visited' : undefined,
                    })),
                    root,
                    type: 'binary',
                },
                message: `Inorder: Visit node ${node.value}. Order so far: [${traversalOrder.join(', ')}]`,
                lineNumber: 3,
                variables: { current: node.value, depth, order: traversalOrder.join(',') },
            });

            // Visit right subtree
            traverse(node.right, depth + 1);
        } else if (traversalType === 'postorder') {
            // Visit both subtrees first
            traverse(node.left, depth + 1);
            traverse(node.right, depth + 1);

            // Visit root last
            traversalOrder.push(node.value);
            steps.push({
                tree: {
                    nodes: nodes.map(n => ({
                        ...n,
                        highlight: n.id === nodeId ? 'visiting' : traversalOrder.includes(n.value) ? 'visited' : undefined,
                    })),
                    root,
                    type: 'binary',
                },
                message: `Postorder: Visit node ${node.value}. Order so far: [${traversalOrder.join(', ')}]`,
                lineNumber: 4,
                variables: { current: node.value, depth, order: traversalOrder.join(',') },
            });
        }
    };

    traverse(root);

    steps.push({
        tree: {
            nodes: nodes.map(n => ({ ...n, highlight: 'visited' as const })),
            root,
            type: 'binary',
        },
        message: `${traversalType.toUpperCase()} traversal complete! Final order: [${traversalOrder.join(', ')}]`,
        lineNumber: 5,
        variables: { result: traversalOrder.join(',') },
    });

    return {
        steps,
        meta: { comparisons: 0, operations },
    };
}
