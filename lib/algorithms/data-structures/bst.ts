import { AlgorithmResult, StepState, TreeState, TreeNode } from '../types';

export function bstOperationsSteps(operation: string, value?: number): AlgorithmResult {
    const steps: StepState[] = [];
    let nodes: TreeNode[] = [];
    let root: string | undefined;
    let operations = 0;

    // Initialize with sample BST
    const initialValues = [50, 30, 70, 20, 40, 60, 80];

    steps.push({
        tree: {
            nodes: [],
            root: undefined,
            type: 'bst',
        },
        message: 'Starting with empty Binary Search Tree',
        lineNumber: 1,
    });

    // Build initial tree
    for (const val of initialValues) {
        const newId = `node-${val}`;
        const newNode: TreeNode = {
            value: val,
            id: newId,
            highlight: 'current',
        };

        if (!root) {
            root = newId;
            nodes.push(newNode);
        } else {
            let current = root;
            let parent = '';

            while (current) {
                parent = current;
                const currentNode = nodes.find(n => n.id === current);
                if (!currentNode) break;

                if (val < currentNode.value) {
                    if (currentNode.left) {
                        current = currentNode.left;
                    } else {
                        currentNode.left = newId;
                        newNode.parent = currentNode.id;
                        nodes.push(newNode);
                        break;
                    }
                } else {
                    if (currentNode.right) {
                        current = currentNode.right;
                    } else {
                        currentNode.right = newId;
                        newNode.parent = currentNode.id;
                        nodes.push(newNode);
                        break;
                    }
                }
            }
        }
    }

    // Remove highlights
    nodes = nodes.map(n => ({ ...n, highlight: undefined }));

    steps.push({
        tree: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            root,
            type: 'bst',
        },
        message: `Initial BST created with values: ${initialValues.join(', ')}`,
        lineNumber: 2,
    });

    if (operation === 'insert' && value !== undefined) {
        steps.push({
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root,
                type: 'bst',
            },
            message: `Inserting ${value} into BST...`,
            lineNumber: 3,
        });

        if (!root) {
            root = `node-${value}`;
            nodes.push({
                value,
                id: root,
                highlight: 'current',
            });
        } else {
            let current = root;

            while (true) {
                operations++;
                const currentNode = nodes.find(n => n.id === current);
                if (!currentNode) break;

                const highlightedNodes = nodes.map(n => ({
                    ...n,
                    highlight: n.id === current ? ('compare' as const) : undefined,
                }));

                steps.push({
                    tree: {
                        nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                        root,
                        type: 'bst',
                    },
                    message: `Comparing ${value} with ${currentNode.value}...`,
                    lineNumber: 4,
                });

                if (value < currentNode.value) {
                    if (currentNode.left) {
                        current = currentNode.left;
                    } else {
                        const newId = `node-${value}`;
                        currentNode.left = newId;
                        nodes.push({
                            value,
                            id: newId,
                            parent: currentNode.id,
                            highlight: 'current',
                        });

                        steps.push({
                            tree: {
                                nodes: JSON.parse(JSON.stringify(nodes)),
                                root,
                                type: 'bst',
                            },
                            message: `${value} < ${currentNode.value}. Inserted ${value} as left child.`,
                            lineNumber: 5,
                            variables: { inserted: value },
                        });
                        break;
                    }
                } else if (value > currentNode.value) {
                    if (currentNode.right) {
                        current = currentNode.right;
                    } else {
                        const newId = `node-${value}`;
                        currentNode.right = newId;
                        nodes.push({
                            value,
                            id: newId,
                            parent: currentNode.id,
                            highlight: 'current',
                        });

                        steps.push({
                            tree: {
                                nodes: JSON.parse(JSON.stringify(nodes)),
                                root,
                                type: 'bst',
                            },
                            message: `${value} > ${currentNode.value}. Inserted ${value} as right child.`,
                            lineNumber: 6,
                            variables: { inserted: value },
                        });
                        break;
                    }
                } else {
                    steps.push({
                        tree: {
                            nodes: JSON.parse(JSON.stringify(nodes)),
                            root,
                            type: 'bst',
                        },
                        message: `Value ${value} already exists in BST. No insertion.`,
                        lineNumber: 7,
                    });
                    break;
                }
            }
        }

        nodes = nodes.map(n => ({ ...n, highlight: undefined }));
        steps.push({
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root,
                type: 'bst',
            },
            message: `Insertion complete!`,
            lineNumber: 8,
        });
    } else if (operation === 'search' && value !== undefined) {
        steps.push({
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root,
                type: 'bst',
            },
            message: `Searching for ${value} in BST...`,
            lineNumber: 3,
        });

        let current = root;
        let found = false;

        while (current) {
            operations++;
            const currentNode = nodes.find(n => n.id === current);
            if (!currentNode) break;

            const highlightedNodes = nodes.map(n => ({
                ...n,
                highlight: n.id === current ? ('compare' as const) : undefined,
            }));

            steps.push({
                tree: {
                    nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                    root,
                    type: 'bst',
                },
                message: `Comparing ${value} with ${currentNode.value}...`,
                lineNumber: 4,
            });

            if (value === currentNode.value) {
                highlightedNodes.find(n => n.id === current)!.highlight = 'found';
                steps.push({
                    tree: {
                        nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                        root,
                        type: 'bst',
                    },
                    message: `Found! Value ${value} exists in BST.`,
                    lineNumber: 5,
                    variables: { found: value },
                });
                found = true;
                break;
            } else if (value < currentNode.value) {
                current = currentNode.left || '';
            } else {
                current = currentNode.right || '';
            }
        }

        if (!found) {
            steps.push({
                tree: {
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    root,
                    type: 'bst',
                },
                message: `Value ${value} not found in BST.`,
                lineNumber: 6,
            });
        }
    }

    return {
        steps,
        meta: { comparisons: operations, operations },
    };
}
