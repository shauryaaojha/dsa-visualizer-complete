import { AlgorithmResult, StepState, StackState } from '../types';

export function infixToPostfixSteps(expression: string): AlgorithmResult {
    const steps: StepState[] = [];
    const stack: string[] = [];
    let postfix = '';
    let operations = 0;

    const precedence: Record<string, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
    };

    const isOperator = (char: string) => '+-*/^'.includes(char);

    steps.push({
        stack: {
            elements: [],
            top: -1,
            implementation: 'array',
        },
        message: `Converting infix expression "${expression}" to postfix`,
        lineNumber: 1,
        variables: { postfix: '' },
    });

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === ' ') continue;

        if (/[a-zA-Z0-9]/.test(char)) {
            postfix += char;
            operations++;

            steps.push({
                stack: {
                    elements: stack.map(s => s.charCodeAt(0)),
                    top: stack.length - 1,
                    implementation: 'array',
                },
                message: `Operand '${char}' found. Add to postfix output.`,
                lineNumber: 2,
                variables: { current: char, postfix, position: i },
            });
        } else if (char === '(') {
            stack.push(char);
            operations++;

            steps.push({
                stack: {
                    elements: stack.map(s => s.charCodeAt(0)),
                    top: stack.length - 1,
                    implementation: 'array',
                },
                message: `Left parenthesis '(' found. Push to stack.`,
                lineNumber: 3,
                variables: { current: char, postfix, stackSize: stack.length },
            });
        } else if (char === ')') {
            operations++;

            steps.push({
                stack: {
                    elements: stack.map(s => s.charCodeAt(0)),
                    top: stack.length - 1,
                    implementation: 'array',
                },
                message: `Right parenthesis ')' found. Pop until '(' is found.`,
                lineNumber: 4,
                variables: { current: char, postfix },
            });

            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                const popped = stack.pop()!;
                postfix += popped;

                steps.push({
                    stack: {
                        elements: stack.map(s => s.charCodeAt(0)),
                        top: stack.length - 1,
                        implementation: 'array',
                    },
                    message: `Popped '${popped}' and added to postfix.`,
                    lineNumber: 5,
                    variables: { popped, postfix },
                });
            }

            if (stack.length > 0) {
                stack.pop(); // Remove '('
                steps.push({
                    stack: {
                        elements: stack.map(s => s.charCodeAt(0)),
                        top: stack.length - 1,
                        implementation: 'array',
                    },
                    message: `Removed matching '(' from stack.`,
                    lineNumber: 6,
                    variables: { postfix },
                });
            }
        } else if (isOperator(char)) {
            operations++;

            while (
                stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                precedence[stack[stack.length - 1]] >= precedence[char]
            ) {
                const popped = stack.pop()!;
                postfix += popped;

                steps.push({
                    stack: {
                        elements: stack.map(s => s.charCodeAt(0)),
                        top: stack.length - 1,
                        implementation: 'array',
                    },
                    message: `Operator '${char}' has lower/equal precedence. Popped '${popped}' to postfix.`,
                    lineNumber: 7,
                    variables: { current: char, popped, postfix },
                });
            }

            stack.push(char);

            steps.push({
                stack: {
                    elements: stack.map(s => s.charCodeAt(0)),
                    top: stack.length - 1,
                    implementation: 'array',
                },
                message: `Pushed operator '${char}' to stack.`,
                lineNumber: 8,
                variables: { current: char, postfix },
            });
        }
    }

    while (stack.length > 0) {
        const popped = stack.pop()!;
        postfix += popped;

        steps.push({
            stack: {
                elements: stack.map(s => s.charCodeAt(0)),
                top: stack.length - 1,
                implementation: 'array',
            },
            message: `End of expression. Popped '${popped}' to postfix.`,
            lineNumber: 9,
            variables: { popped, postfix },
        });
    }

    steps.push({
        stack: {
            elements: [],
            top: -1,
            implementation: 'array',
        },
        message: `Conversion complete! Postfix expression: "${postfix}"`,
        lineNumber: 10,
        variables: { postfix, result: postfix },
    });

    return {
        steps,
        meta: { comparisons: 0, operations },
    };
}
