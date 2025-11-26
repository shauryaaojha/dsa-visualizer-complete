import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export function* linearSearchGenerator(arr: number[], target: number): Generator<StepSnapshot, void, unknown> {
  const array = [...arr]
  let comparisons = 0

  yield {
    state: { array: [...array], target },
    description: `Starting Linear Search for value ${target}`,
    metrics: { comparisons },
  }

  for (let i = 0; i < array.length; i++) {
    comparisons++
    yield {
      state: { array: [...array], target, currentIndex: i },
      highlightedIndices: [i],
      description: `Checking index ${i}: ${array[i]} ${array[i] === target ? "=" : "≠"} ${target}`,
      metrics: { comparisons },
    }

    if (array[i] === target) {
      yield {
        state: { array: [...array], target, currentIndex: i, found: true },
        highlightedIndices: [i],
        description: `Found ${target} at index ${i}!`,
        metrics: { comparisons },
      }
      return
    }
  }

  yield {
    state: { array: [...array], target, found: false },
    description: `${target} not found in the array. Total comparisons: ${comparisons}`,
    metrics: { comparisons },
  }
}

