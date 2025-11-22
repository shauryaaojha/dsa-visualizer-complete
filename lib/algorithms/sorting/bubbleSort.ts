import { AlgorithmResult, StepState } from '../types';

export function bubbleSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0;
    const n = array.length;

    // Initial state
    steps.push({
        array: [...array],
        message: 'Starting Bubble Sort. We will compare adjacent elements and swap if they are in wrong order.',
        lineNumber: 1,
        variables: { n, pass: 0 },
    });

    for (let i = 0; i < n - 1; i++) {
        steps.push({
            array: [...array],
            message: `Starting pass ${i + 1}. Will bubble the largest unsorted element to position ${n - i - 1}.`,
            lineNumber: 2,
            variables: { n, pass: i + 1, i },
        });

        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [j, j + 1],
                    type: 'compare',
                },
                message: `Comparing array[${j}] = ${array[j]} and array[${j + 1}] = ${array[j + 1]}.`,
                lineNumber: 4,
                variables: { n, pass: i + 1, i, j },
            });

            if (array[j] > array[j + 1]) {
                swaps++;

                steps.push({
                    array: [...array],
                    highlights: {
                        indices: [j, j + 1],
                        type: 'swap',
                    },
                    message: `Swapping array[${j}] = ${array[j]} and array[${j + 1}] = ${array[j + 1]} because ${array[j]} > ${array[j + 1]}.`,
                    lineNumber: 5,
                    variables: { n, pass: i + 1, i, j },
                });

                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;

                steps.push({
                    array: [...array],
                    highlights: {
                        indices: [j, j + 1],
                        type: 'swap',
                    },
                    message: `Swapped. Array is now [${array.join(', ')}].`,
                    lineNumber: 6,
                    variables: { n, pass: i + 1, i, j },
                });
            }
        }

        if (!swapped) {
            steps.push({
                array: [...array],
                message: `Pass ${i + 1} complete with no swaps. Array is already sorted!`,
                lineNumber: 8,
                variables: { n, pass: i + 1, i },
            });
            break;
        }
    }

    steps.push({
        array: [...array],
        message: `Bubble Sort complete! Sorted array: [${array.join(', ')}]. Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
        lineNumber: 9,
        variables: { n },
    });

    return {
        steps,
        meta: { comparisons, swaps },
    };
}
