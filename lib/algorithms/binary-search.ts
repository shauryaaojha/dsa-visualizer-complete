import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export function* binarySearchGenerator(arr: number[], target: number): Generator<StepSnapshot, void, unknown> {
  const array = [...arr].sort((a, b) => a - b)
  let comparisons = 0
  let left = 0
  let right = array.length - 1

  yield {
    state: { array: [...array], target, left, right },
    description: `Starting Binary Search for value ${target} in sorted array`,
    metrics: { comparisons },
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    comparisons++

    yield {
      state: { array: [...array], target, left, right, mid },
      highlightedIndices: [mid],
      description: `Checking middle element at index ${mid}: ${array[mid]}`,
      metrics: { comparisons },
    }

    if (array[mid] === target) {
      yield {
        state: { array: [...array], target, left, right, mid, found: true },
        highlightedIndices: [mid],
        description: `Found ${target} at index ${mid}!`,
        metrics: { comparisons },
      }
      return
    }

    if (array[mid] < target) {
      left = mid + 1
      yield {
        state: { array: [...array], target, left, right, mid },
        highlightedIndices: [mid],
        description: `${array[mid]} < ${target}, searching right half (indices ${left} to ${right})`,
        metrics: { comparisons },
      }
    } else {
      right = mid - 1
      yield {
        state: { array: [...array], target, left, right, mid },
        highlightedIndices: [mid],
        description: `${array[mid]} > ${target}, searching left half (indices ${left} to ${right})`,
        metrics: { comparisons },
      }
    }
  }

  yield {
    state: { array: [...array], target, found: false },
    description: `${target} not found in the array. Total comparisons: ${comparisons}`,
    metrics: { comparisons },
  }
}

