import { AlgorithmResult, StepState, LinkedListState, LinkedListNode } from '../types';

export function singlyLinkedListSteps(operation: string, value?: number, position?: number): AlgorithmResult {
    const steps: StepState[] = [];
    let nodes: LinkedListNode[] = [];
    let head: string | undefined;
    let operations = 0;

    // Initialize with some sample data
    const initialValues = [10, 20, 30, 40];
    initialValues.forEach((val, idx) => {
        const id = `node-${idx}`;
        nodes.push({
            value: val,
            id,
            next: idx < initialValues.length - 1 ? `node-${idx + 1}` : undefined,
        });
    });
    head = 'node-0';

    steps.push({
        linkedList: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            head,
            type: 'singly',
        },
        message: `Initial Singly Linked List: ${initialValues.join(' → ')}`,
        lineNumber: 1,
    });

    if (operation === 'insert-beginning' && value !== undefined) {
        const newId = `node-new`;
        operations++;

        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Inserting ${value} at the beginning`,
            lineNumber: 2,
        });

        const newNode: LinkedListNode = {
            value,
            id: newId,
            next: head,
            highlight: 'current',
        };
        nodes.unshift(newNode);
        head = newId;
        operations++;

        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `New node ${value} points to previous head. Update head to new node.`,
            lineNumber: 3,
            variables: { inserted: value },
        });

        nodes = nodes.map(n => ({ ...n, highlight: undefined }));
        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Insertion complete! List: ${value} → ${initialValues.join(' → ')}`,
            lineNumber: 4,
        });
    } else if (operation === 'insert-end' && value !== undefined) {
        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Inserting ${value} at the end. Traversing to find last node...`,
            lineNumber: 2,
        });

        let current = head;
        let idx = 0;
        while (current && nodes.find(n => n.id === current)?.next) {
            operations++;
            const highlightedNodes = nodes.map(n => ({
                ...n,
                highlight: n.id === current ? ('current' as const) : undefined,
            }));

            steps.push({
                linkedList: {
                    nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                    head,
                    type: 'singly',
                },
                message: `Traversing: at node ${nodes.find(n => n.id === current)?.value}`,
                lineNumber: 3,
            });

            current = nodes.find(n => n.id === current)?.next;
            idx++;
        }

        const newId = `node-new`;
        const lastNode = nodes.find(n => n.id === current);
        if (lastNode) {
            lastNode.next = newId;
        }
        nodes.push({
            value,
            id: newId,
            highlight: 'current',
        });
        operations++;

        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Last node now points to new node ${value}. Insertion complete!`,
            lineNumber: 4,
            variables: { inserted: value },
        });
    } else if (operation === 'delete-beginning') {
        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Deleting node from beginning`,
            lineNumber: 2,
        });

        const deletedNode = nodes.find(n => n.id === head);
        if (deletedNode) {
            head = deletedNode.next;
            nodes = nodes.filter(n => n.id !== deletedNode.id);
            operations++;

            steps.push({
                linkedList: {
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    head,
                    type: 'singly',
                },
                message: `Deleted node ${deletedNode.value}. Head now points to next node.`,
                lineNumber: 3,
                variables: { deleted: deletedNode.value },
            });
        }
    } else if (operation === 'search' && value !== undefined) {
        steps.push({
            linkedList: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                head,
                type: 'singly',
            },
            message: `Searching for value ${value}...`,
            lineNumber: 2,
        });

        let current = head;
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
                linkedList: {
                    nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                    head,
                    type: 'singly',
                },
                message: `Checking node ${currentNode.value}...`,
                lineNumber: 3,
            });

            if (currentNode.value === value) {
                highlightedNodes.find(n => n.id === current)!.highlight = 'found';
                steps.push({
                    linkedList: {
                        nodes: JSON.parse(JSON.stringify(highlightedNodes)),
                        head,
                        type: 'singly',
                    },
                    message: `Found! Value ${value} exists in the list.`,
                    lineNumber: 4,
                    variables: { found: value },
                });
                found = true;
                break;
            }

            current = currentNode.next;
        }

        if (!found) {
            steps.push({
                linkedList: {
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    head,
                    type: 'singly',
                },
                message: `Value ${value} not found in the list.`,
                lineNumber: 5,
            });
        }
    }

    return {
        steps,
        meta: { comparisons: operations, operations },
    };
}
