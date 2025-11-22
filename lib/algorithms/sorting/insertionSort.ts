import { AlgorithmResult, StepState } from '../types';

export function insertionSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0;
    const n = array.length;

    steps.push({
        array: [...array],
        message: 'Starting Insertion Sort. We will build a sorted portion by inserting elements one by one.',
        lineNumber: 1,
        variables: { n },
    });

    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;

        steps.push({
            array: [...array],
            highlights: {
                indices: [i],
                type: 'current',
            },
            message: `Selecting array[${i}] = ${key} to insert into sorted portion [0...${i - 1}].`,
            lineNumber: 2,
            variables: { n, i, j, key },
        });

        while (j >= 0 && array[j] > key) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [j, i],
                    type: 'compare',
                },
                message: `Comparing array[${j}] = ${array[j]} with key = ${key}. Since ${array[j]} > ${key}, shift ${array[j]} to the right.`,
                lineNumber: 4,
                variables: { n, i, j, key },
            });

            array[j + 1] = array[j];
            swaps++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [j + 1],
                    type: 'swap',
                },
                message: `Shifted array[${j}] = ${array[j + 1]} to position ${j + 1}.`,
                lineNumber: 5,
                variables: { n, i, j, key },
            });

            j--;
        }

        if (j >= 0) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [j],
                    type: 'compare',
                },
                message: `Comparing array[${j}] = ${array[j]} with key = ${key}. Since ${array[j]} <= ${key}, stop shifting.`,
                lineNumber: 4,
                variables: { n, i, j, key },
            });
        }

        array[j + 1] = key;

        steps.push({
            array: [...array],
            highlights: {
                indices: [j + 1],
                type: 'swap',
            },
            message: `Inserted key = ${key} at position ${j + 1}. Sorted portion is now [0...${i}].`,
            lineNumber: 7,
            variables: { n, i, j: j + 1, key },
        });
    }

    steps.push({
        array: [...array],
        message: `Insertion Sort complete! Sorted array: [${array.join(', ')}]. Total comparisons: ${comparisons}, Total shifts: ${swaps}.`,
        lineNumber: 8,
        variables: { n },
    });

    return {
        steps,
        meta: { comparisons, swaps },
    };
}
