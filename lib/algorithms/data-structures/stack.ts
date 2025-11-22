import { AlgorithmResult, StepState, StackState } from '../types';

export function stackOperationsSteps(operations: Array<{ op: 'push' | 'pop' | 'peek', value?: number }>): AlgorithmResult {
    const steps: StepState[] = [];
    const elements: number[] = [];
    let top = -1;
    const capacity = 10;
    let oper

    ations = 0;

    steps.push({
        stack: {
            elements: [...elements],
            top,
            capacity,
            implementation: 'array',
        },
        message: 'Initialized empty stack with capacity 10',
        lineNumber: 1,
    });

    for (const operation of operations) {
        if (operation.op === 'push' && operation.value !== undefined) {
            if (top >= capacity - 1) {
                steps.push({
                    stack: {
                        elements: [...elements],
                        top,
                        capacity,
                        implementation: 'array',
                    },
                    message: `Stack Overflow! Cannot push ${operation.value}`,
                    lineNumber: 2,
                });
                continue;
            }

            top++;
            elements.push(operation.value);
            operations++;

            steps.push({
                stack: {
                    elements: [...elements],
                    top,
                    capacity,
                    implementation: 'array',
                    highlights: [top],
                },
                message: `Pushed ${operation.value} onto stack. Top = ${top}`,
                lineNumber: 3,
                variables: { top, size: elements.length },
            });
        } else if (operation.op === 'pop') {
            if (top < 0) {
                steps.push({
                    stack: {
                        elements: [...elements],
                        top,
                        capacity,
                        implementation: 'array',
                    },
                    message: 'Stack Underflow! Cannot pop from empty stack',
                    lineNumber: 4,
                });
                continue;
            }

            const popped = elements[top];
            elements.pop();
            top--;
            operations++;

            steps.push({
                stack: {
                    elements: [...elements],
                    top,
                    capacity,
                    implementation: 'array',
                },
                message: `Popped ${popped} from stack. Top = ${top}`,
                lineNumber: 5,
                variables: { top, popped, size: elements.length },
            });
        } else if (operation.op === 'peek') {
            if (top < 0) {
                steps.push({
                    stack: {
                        elements: [...elements],
                        top,
                        capacity,
                        implementation: 'array',
                    },
                    message: 'Stack is empty. Peek returns null',
                    lineNumber: 6,
                });
            } else {
                steps.push({
                    stack: {
                        elements: [...elements],
                        top,
                        capacity,
                        implementation: 'array',
                        highlights: [top],
                    },
                    message: `Peek: Top element is ${elements[top]}`,
                    lineNumber: 7,
                    variables: { top, topElement: elements[top] },
                });
            }
        }
    }

    return {
        steps,
        meta: { comparisons: 0, operations },
    };
}
