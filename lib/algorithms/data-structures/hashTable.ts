import { AlgorithmResult, StepState, HashTableState, HashBucket } from '../types';

export function hashTableLinearProbingSteps(operations: Array<{ op: 'insert' | 'search', value: number }>): AlgorithmResult {
    const steps: StepState[] = [];
    const size = 10;
    const buckets: HashBucket[] = Array.from({ length: size }, (_, i) => ({
        index: i,
        values: [],
        status: 'empty',
    }));
    let operationCount = 0;

    const hashFunction = (key: number) => key % size;

    steps.push({
        hashTable: {
            buckets: JSON.parse(JSON.stringify(buckets)),
            size,
            collisionMethod: 'linear',
            hashFunction: `h(k) = k % ${size}`,
        },
        message: `Initialized hash table with size ${size} using linear probing`,
        lineNumber: 1,
    });

    for (const operation of operations) {
        if (operation.op === 'insert') {
            const key = operation.value;
            let index = hashFunction(key);
            const originalIndex = index;

            steps.push({
                hashTable: {
                    buckets: JSON.parse(JSON.stringify(buckets)),
                    size,
                    collisionMethod: 'linear',
                    hashFunction: `h(k) = k % ${size}`,
                },
                message: `Inserting ${key}. Hash: h(${key}) = ${index}`,
                lineNumber: 2,
                variables: { key, hash: index },
            });

            let probeCount = 0;
            while (buckets[index].status === 'occupied' && probeCount < size) {
                operationCount++;
                probeCount++;

                steps.push({
                    hashTable: {
                        buckets: buckets.map((b, i) => ({
                            ...b,
                            highlight: i === index ? 'compare' : undefined,
                        })),
                        size,
                        collisionMethod: 'linear',
                        hashFunction: `h(k) = k % ${size}`,
                    },
                    message: `Collision at index ${index}! Probing to next slot...`,
                    lineNumber: 3,
                    variables: { key, index, probeCount },
                });

                index = (index + 1) % size;
            }

            if (probeCount < size) {
                buckets[index].value = key;
                buckets[index].status = 'occupied';
                operationCount++;

                steps.push({
                    hashTable: {
                        buckets: buckets.map((b, i) => ({
                            ...b,
                            highlight: i === index ? 'found' : undefined,
                        })),
                        size,
                        collisionMethod: 'linear',
                        hashFunction: `h(k) = k % ${size}`,
                    },
                    message: `Inserted ${key} at index ${index}${index !== originalIndex ? ` (after ${probeCount} probes)` : ''}`,
                    lineNumber: 4,
                    variables: { key, index, probes: probeCount },
                });
            } else {
                steps.push({
                    hashTable: {
                        buckets: JSON.parse(JSON.stringify(buckets)),
                        size,
                        collisionMethod: 'linear',
                        hashFunction: `h(k) = k % ${size}`,
                    },
                    message: `Hash table is full! Cannot insert ${key}`,
                    lineNumber: 5,
                });
            }
        } else if (operation.op === 'search') {
            const key = operation.value;
            let index = hashFunction(key);
            const originalIndex = index;

            steps.push({
                hashTable: {
                    buckets: JSON.parse(JSON.stringify(buckets)),
                    size,
                    collisionMethod: 'linear',
                    hashFunction: `h(k) = k % ${size}`,
                },
                message: `Searching for ${key}. Hash: h(${key}) = ${index}`,
                lineNumber: 6,
                variables: { key, hash: index },
            });

            let probeCount = 0;
            let found = false;

            while (probeCount < size) {
                operationCount++;

                steps.push({
                    hashTable: {
                        buckets: buckets.map((b, i) => ({
                            ...b,
                            highlight: i === index ? 'compare' : undefined,
                        })),
                        size,
                        collisionMethod: 'linear',
                        hashFunction: `h(k) = k % ${size}`,
                    },
                    message: `Checking index ${index}...`,
                    lineNumber: 7,
                    variables: { key, index, probeCount },
                });

                if (buckets[index].status === 'empty') {
                    steps.push({
                        hashTable: {
                            buckets: JSON.parse(JSON.stringify(buckets)),
                            size,
                            collisionMethod: 'linear',
                            hashFunction: `h(k) = k % ${size}`,
                        },
                        message: `Empty slot found. ${key} not in table.`,
                        lineNumber: 8,
                    });
                    break;
                }

                if (buckets[index].value === key) {
                    found = true;
                    steps.push({
                        hashTable: {
                            buckets: buckets.map((b, i) => ({
                                ...b,
                                highlight: i === index ? 'found' : undefined,
                            })),
                            size,
                            collisionMethod: 'linear',
                            hashFunction: `h(k) = k % ${size}`,
                        },
                        message: `Found ${key} at index ${index}!`,
                        lineNumber: 9,
                        variables: { key, index, foundKey: key },
                    });
                    break;
                }

                index = (index + 1) % size;
                probeCount++;
            }

            if (!found && probeCount >= size) {
                steps.push({
                    hashTable: {
                        buckets: JSON.parse(JSON.stringify(buckets)),
                        size,
                        collisionMethod: 'linear',
                        hashFunction: `h(k) = k % ${size}`,
                    },
                    message: `${key} not found after checking all slots.`,
                    lineNumber: 10,
                });
            }
        }
    }

    return {
        steps,
        meta: { comparisons: operationCount, operations: operationCount },
    };
}
