import { AlgorithmResult, StepState } from '../types';

export function binarySearchSteps(input: number[], target: number): AlgorithmResult {
    const array = [...input].sort((a, b) => a - b);
    const steps: StepState[] = [];
    let comparisons = 0;
    const n = array.length;

    steps.push({
        array: [...array],
        message: `Starting Binary Search for target = ${target}. Array has been sorted: [${array.join(', ')}].`,
        lineNumber: 1,
        variables: { n, target },
    });

    let low = 0;
    let high = n - 1;

    steps.push({
        array: [...array],
        highlights: {
            indices: [low, high],
            type: 'low',
        },
        message: `Initialize search range: low = ${low}, high = ${high}.`,
        lineNumber: 2,
        variables: { n, low, high, target },
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        steps.push({
            array: [...array],
            highlights: {
                indices: [low, high, mid],
                type: 'mid',
            },
            message: `Calculate mid = floor((${low} + ${high}) / 2) = ${mid}. Checking array[${mid}] = ${array[mid]}.`,
            lineNumber: 4,
            variables: { n, low, high, mid, target },
        });

        comparisons++;

        steps.push({
            array: [...array],
            highlights: {
                indices: [mid],
                type: 'compare',
            },
            message: `Comparing array[${mid}] = ${array[mid]} with target = ${target}.`,
            lineNumber: 5,
            variables: { n, low, high, mid, target },
        });

        if (array[mid] === target) {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [mid],
                    type: 'found',
                },
                message: `Found! Target ${target} found at index ${mid}. Total comparisons: ${comparisons}.`,
                lineNumber: 6,
                variables: { n, low, high, mid, target },
            });

            return {
                steps,
                meta: { comparisons },
            };
        } else if (array[mid] < target) {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [mid],
                    type: 'compare',
                },
                message: `array[${mid}] = ${array[mid]} < ${target}. Search in right half. Set low = ${mid + 1}.`,
                lineNumber: 8,
                variables: { n, low, high, mid, target },
            });

            low = mid + 1;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [low, high],
                    type: 'low',
                },
                message: `New search range: low = ${low}, high = ${high}.`,
                lineNumber: 9,
                variables: { n, low, high, target },
            });
        } else {
            steps.push({
                array: [...array],
                highlights: {
                    indices: [mid],
                    type: 'compare',
                },
                message: `array[${mid}] = ${array[mid]} > ${target}. Search in left half. Set high = ${mid - 1}.`,
                lineNumber: 11,
                variables: { n, low, high, mid, target },
            });

            high = mid - 1;

            steps.push({
                array: [...array],
                highlights: {
                    indices: [low, high],
                    type: 'high',
                },
                message: `New search range: low = ${low}, high = ${high}.`,
                lineNumber: 12,
                variables: { n, low, high, target },
            });
        }
    }

    steps.push({
        array: [...array],
        message: `Target ${target} not found in the array. Search space exhausted (low > high). Total comparisons: ${comparisons}.`,
        lineNumber: 14,
        variables: { n, low, high, target },
    });

    return {
        steps,
        meta: { comparisons },
    };
}
