export function parseInput(input: string): number[] {
    if (!input || input.trim() === '') {
        throw new Error('Input cannot be empty');
    }

    // Split by comma or space
    const parts = input
        .split(/[\s,]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const numbers: number[] = [];

    for (const part of parts) {
        const num = parseInt(part, 10);
        if (isNaN(num)) {
            throw new Error(`Invalid number: "${part}". Please enter valid integers.`);
        }
        numbers.push(num);
    }

    if (numbers.length === 0) {
        throw new Error('No valid numbers found in input');
    }

    return numbers;
}
