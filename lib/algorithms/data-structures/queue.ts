import { AlgorithmResult, StepState, QueueState } from '../types';

export function queueOperationsSteps(operations: Array<{ op: 'enqueue' | 'dequeue' | 'peek', value?: number }>): AlgorithmResult {
    const steps: StepState[] = [];
    const elements: number[] = [];
    let front = 0;
    let rear = -1;
    const capacity = 10;
    let operationCount = 0;

    steps.push({
        queue: {
            elements: [...elements],
            front,
            rear,
            capacity,
            type: 'linear',
            implementation: 'array',
        },
        message: 'Initialized empty queue with capacity 10',
        lineNumber: 1,
    });

    for (const operation of operations) {
        if (operation.op === 'enqueue' && operation.value !== undefined) {
            if (rear >= capacity - 1) {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'linear',
                        implementation: 'array',
                    },
                    message: `Queue Overflow! Cannot enqueue ${operation.value}`,
                    lineNumber: 2,
                });
                continue;
            }

            rear++;
            elements.push(operation.value);
            operationCount++;

            steps.push({
                queue: {
                    elements: [...elements],
                    front,
                    rear,
                    capacity,
                    type: 'linear',
                    implementation: 'array',
                    highlights: [rear],
                },
                message: `Enqueued ${operation.value}. Front = ${front}, Rear = ${rear}`,
                lineNumber: 3,
                variables: { front, rear, size: elements.length },
            });
        } else if (operation.op === 'dequeue') {
            if (front > rear || elements.length === 0) {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'linear',
                        implementation: 'array',
                    },
                    message: 'Queue Underflow! Cannot dequeue from empty queue',
                    lineNumber: 4,
                });
                continue;
            }

            const dequeued = elements[front];
            front++;
            operationCount++;

            steps.push({
                queue: {
                    elements: [...elements],
                    front,
                    rear,
                    capacity,
                    type: 'linear',
                    implementation: 'array',
                },
                message: `Dequeued ${dequeued}. Front = ${front}, Rear = ${rear}`,
                lineNumber: 5,
                variables: { front, rear, dequeued, size: rear - front + 1 },
            });
        } else if (operation.op === 'peek') {
            if (front > rear || elements.length === 0) {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'linear',
                        implementation: 'array',
                    },
                    message: 'Queue is empty. Peek returns null',
                    lineNumber: 6,
                });
            } else {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'linear',
                        implementation: 'array',
                        highlights: [front],
                    },
                    message: `Peek: Front element is ${elements[front]}`,
                    lineNumber: 7,
                    variables: { front, rear, frontElement: elements[front] },
                });
            }
        }
    }

    return {
        steps,
        meta: { comparisons: 0, operations: operationCount },
    };
}

export function circularQueueSteps(operations: Array<{ op: 'enqueue' | 'dequeue', value?: number }>): AlgorithmResult {
    const steps: StepState[] = [];
    const capacity = 5;
    const elements: number[] = new Array(capacity).fill(-1);
    let front = -1;
    let rear = -1;
    let size = 0;
    let operationCount = 0;

    steps.push({
        queue: {
            elements: [...elements],
            front,
            rear,
            capacity,
            type: 'circular',
            implementation: 'array',
        },
        message: 'Initialized circular queue with capacity 5',
        lineNumber: 1,
        variables: { front, rear, size },
    });

    for (const operation of operations) {
        if (operation.op === 'enqueue' && operation.value !== undefined) {
            if (size === capacity) {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'circular',
                        implementation: 'array',
                    },
                    message: `Queue is full! Cannot enqueue ${operation.value}`,
                    lineNumber: 2,
                    variables: { front, rear, size },
                });
                continue;
            }

            if (front === -1) front = 0;
            rear = (rear + 1) % capacity;
            elements[rear] = operation.value;
            size++;
            operationCount++;

            steps.push({
                queue: {
                    elements: [...elements],
                    front,
                    rear,
                    capacity,
                    type: 'circular',
                    implementation: 'array',
                    highlights: [rear],
                },
                message: `Enqueued ${operation.value} at position ${rear}. Size = ${size}`,
                lineNumber: 3,
                variables: { front, rear, size },
            });
        } else if (operation.op === 'dequeue') {
            if (size === 0) {
                steps.push({
                    queue: {
                        elements: [...elements],
                        front,
                        rear,
                        capacity,
                        type: 'circular',
                        implementation: 'array',
                    },
                    message: 'Queue is empty! Cannot dequeue',
                    lineNumber: 4,
                    variables: { front, rear, size },
                });
                continue;
            }

            const dequeued = elements[front];
            elements[front] = -1;

            if (size === 1) {
                front = -1;
                rear = -1;
            } else {
                front = (front + 1) % capacity;
            }
            size--;
            operationCount++;

            steps.push({
                queue: {
                    elements: [...elements],
                    front,
                    rear,
                    capacity,
                    type: 'circular',
                    implementation: 'array',
                },
                message: `Dequeued ${dequeued}. Front = ${front}, Size = ${size}`,
                lineNumber: 5,
                variables: { front, rear, size, dequeued },
            });
        }
    }

    return {
        steps,
        meta: { comparisons: 0, operations: operationCount },
    };
}
