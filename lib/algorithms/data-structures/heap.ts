import { AlgorithmResult, StepState, HeapState } from '../types';

export function minHeapSteps(operation: string, value?: number): AlgorithmResult {
    const steps: StepState[] = [];
    let heap: number[] = [15, 20, 30, 40, 50, 55, 60];
    let operationCount = 0;

    steps.push({
        heap: {
            array: [...heap],
            type: 'min',
        },
        message: 'Initial Min Heap: [15, 20, 30, 40, 50, 55, 60]',
        lineNumber: 1,
    });

    if (operation === 'insert' && value !== undefined) {
        heap.push(value);
        let currentIndex = heap.length - 1;

        steps.push({
            heap: {
                array: [...heap],
                type: 'min',
                highlights: {
                    indices: [currentIndex],
                    type: 'current',
                },
            },
            message: `Inserted ${value} at end of heap (index ${currentIndex})`,
            lineNumber: 2,
            variables: { currentIndex, value },
        });

        // Heapify up
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            operationCount++;

            steps.push({
                heap: {
                    array: [...heap],
                    type: 'min',
                    highlights: {
                        indices: [currentIndex, parentIndex],
                        type: 'compare',
                    },
                },
                message: `Comparing ${heap[currentIndex]} at index ${currentIndex} with parent ${heap[parentIndex]} at index ${parentIndex}`,
                lineNumber: 3,
                variables: { currentIndex, parentIndex },
            });

            if (heap[currentIndex] < heap[parentIndex]) {
                [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];

                steps.push({
                    heap: {
                        array: [...heap],
                        type: 'min',
                        highlights: {
                            indices: [parentIndex],
                            type: 'swap',
                        },
                    },
                    message: `Swapped ${heap[parentIndex]} with ${heap[currentIndex]}. Moving up the heap.`,
                    lineNumber: 4,
                    variables: { currentIndex: parentIndex, parentIndex },
                });

                currentIndex = parentIndex;
            } else {
                steps.push({
                    heap: {
                        array: [...heap],
                        type: 'min',
                    },
                    message: 'Heap property satisfied. Insert complete!',
                    lineNumber: 5,
                });
                break;
            }
        }
    } else if (operation === 'extract-min') {
        if (heap.length === 0) {
            steps.push({
                heap: {
                    array: [],
                    type: 'min',
                },
                message: 'Heap is empty!',
                lineNumber: 6,
            });
            return { steps, meta: { comparisons: operationCount } };
        }

        const minValue = heap[0];

        steps.push({
            heap: {
                array: [...heap],
                type: 'min',
                highlights: {
                    indices: [0],
                    type: 'found',
                },
            },
            message: `Extracting minimum value: ${minValue}`,
            lineNumber: 7,
            variables: { minValue },
        });

        heap[0] = heap[heap.length - 1];
        heap.pop();

        if (heap.length === 0) {
            steps.push({
                heap: {
                    array: [],
                    type: 'min',
                },
                message: `Extracted ${minValue}. Heap is now empty.`,
                lineNumber: 8,
                variables: { extracted: minValue },
            });
            return { steps, meta: { comparisons: operationCount } };
        }

        steps.push({
            heap: {
                array: [...heap],
                type: 'min',
                highlights: {
                    indices: [0],
                    type: 'current',
                },
            },
            message: `Moved last element ${heap[0]} to root. Now heapifying down...`,
            lineNumber: 9,
        });

        // Heapify down
        let currentIndex = 0;
        while (true) {
            const leftChild = 2 * currentIndex + 1;
            const rightChild = 2 * currentIndex + 2;
            let smallest = currentIndex;

            if (leftChild < heap.length) {
                operationCount++;
                if (heap[leftChild] < heap[smallest]) {
                    smallest = leftChild;
                }
            }

            if (rightChild < heap.length) {
                operationCount++;
                if (heap[rightChild] < heap[smallest]) {
                    smallest = rightChild;
                }
            }

            if (smallest !== currentIndex) {
                steps.push({
                    heap: {
                        array: [...heap],
                        type: 'min',
                        highlights: {
                            indices: [currentIndex, smallest],
                            type: 'swap',
                        },
                    },
                    message: `Swapping ${heap[currentIndex]} at index ${currentIndex} with ${heap[smallest]} at index ${smallest}`,
                    lineNumber: 10,
                    variables: { currentIndex, smallest },
                });

                [heap[currentIndex], heap[smallest]] = [heap[smallest], heap[currentIndex]];
                currentIndex = smallest;
            } else {
                break;
            }
        }

        steps.push({
            heap: {
                array: [...heap],
                type: 'min',
            },
            message: `Extract complete! Removed ${minValue}. Heap restored.`,
            lineNumber: 11,
            variables: { extracted: minValue },
        });
    }

    return {
        steps,
        meta: { comparisons: operationCount },
    };
}
