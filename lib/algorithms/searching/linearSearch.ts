import { AlgorithmResult, StepState } from '../types';

export function linearSearchSteps(input: number[], target: number): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    const n = array.length;

    steps.push({
        array: [...array],
        message: `Starting Linear Search for target = ${target}. We will check each element sequentially.`,
        lineNumber: 1,
        variables: { n, target },
    });

    for (let i = 0; i < n; i++) {
        comparisons++;

        steps.push({
            array: [...array],
            highlights: {
                indices: [i],
                type: 'current',
            },
            message: `Checking array[${i}] = ${array[i]}...`,
            lineNumber: 3,
            variables: { n, i, target },
        });

        steps.push({
            array: [...array],
            highlights: {
                indices: [i],
                type: 'compare',
            },
            message: `Comparing array[${i}] = ${array[i]} with target = ${target}.`,
            lineNumber: 4,
            variables: { n, i, target },
        });

        if (array[i] === target) {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [i],
                    type: 'found',
                },
                message: `Found! Target ${target} found at index ${i}. Total comparisons: ${comparisons}.`,
                lineNumber: 5,
                variables: { n, i, target },
            });

            return {
                steps,
                meta: { comparisons },
            };
        } else {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [i],
                    type: 'compare',
                },
                message: `array[${i}] = ${array[i]} ≠ ${target}. Continue searching...`,
                lineNumber: 7,
                variables: { n, i, target },
            });
        }
    }

    steps.push({
        array: [...array],
        message: `Target ${target} not found in the array. Searched all ${n} elements. Total comparisons: ${comparisons}.`,
        lineNumber: 8,
        variables: { n, target },
    });

    return {
        steps,
        meta: { comparisons },
    };
}
