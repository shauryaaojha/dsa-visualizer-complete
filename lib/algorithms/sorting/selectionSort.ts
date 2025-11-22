import { AlgorithmResult, StepState } from '../types';

export function selectionSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0;
    const n = array.length;

    steps.push({
        array: [...array],
        message: 'Starting Selection Sort. We will find the minimum element and place it at the beginning.',
        lineNumber: 1,
        variables: { n },
    });

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        steps.push({
            array: [...array],
            highlights: {
                indices: [i],
                type: 'current',
            },
            message: `Pass ${i + 1}: Finding minimum element from index ${i} to ${n - 1}.`,
            lineNumber: 2,
            variables: { n, i, minIndex },
        });

        for (let j = i + 1; j < n; j++) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [minIndex, j],
                    type: 'compare',
                },
                message: `Comparing array[${j}] = ${array[j]} with current minimum array[${minIndex}] = ${array[minIndex]}.`,
                lineNumber: 4,
                variables: { n, i, j, minIndex },
            });

            if (array[j] < array[minIndex]) {
                minIndex = j;

                steps.push({
                    array: [...array],
                    highlights: {
                        indices: [minIndex],
                        type: 'pivot',
                    },
                    message: `Found new minimum: array[${minIndex}] = ${array[minIndex]}.`,
                    lineNumber: 5,
                    variables: { n, i, j, minIndex },
                });
            }
        }

        if (minIndex !== i) {
            swaps++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [i, minIndex],
                    type: 'swap',
                },
                message: `Swapping array[${i}] = ${array[i]} with minimum array[${minIndex}] = ${array[minIndex]}.`,
                lineNumber: 7,
                variables: { n, i, minIndex },
            });

            [array[i], array[minIndex]] = [array[minIndex], array[i]];

            steps.push({
                array: [...array],
                highlights: {
                    indices: [i],
                    type: 'swap',
                },
                message: `Swapped. Element ${array[i]} is now in its correct position.`,
                lineNumber: 8,
                variables: { n, i, minIndex },
            });
        } else {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [i],
                    type: 'current',
                },
                message: `Element at index ${i} is already the minimum. No swap needed.`,
                lineNumber: 8,
                variables: { n, i, minIndex },
            });
        }
    }

    steps.push({
        array: [...array],
        message: `Selection Sort complete! Sorted array: [${array.join(', ')}]. Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
        lineNumber: 9,
        variables: { n },
    });

    return {
        steps,
        meta: { comparisons, swaps },
    };
}
