import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export function* bubbleSortGenerator(arr: number[]): Generator<StepSnapshot, void, unknown> {
  const array = [...arr]
  let comparisons = 0
  let swaps = 0
  const n = array.length

  yield {
    state: { array: [...array] },
    description: `Starting Bubble Sort with array of ${n} elements`,
    metrics: { comparisons, swaps },
  }

  for (let i = 0; i < n - 1; i++) {
    yield {
      state: { array: [...array] },
      highlightedIndices: [],
      description: `Pass ${i + 1}: Comparing adjacent elements`,
      metrics: { comparisons, swaps },
    }

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      yield {
        state: { array: [...array] },
        highlightedIndices: [j, j + 1],
        description: `Comparing ${array[j]} and ${array[j + 1]}`,
        metrics: { comparisons, swaps },
      }

      if (array[j] > array[j + 1]) {
        // Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        swaps++
        yield {
          state: { array: [...array] },
          highlightedIndices: [j, j + 1],
          description: `Swapped ${array[j + 1]} and ${array[j]}`,
          metrics: { comparisons, swaps },
        }
      } else {
        yield {
          state: { array: [...array] },
          highlightedIndices: [j, j + 1],
          description: `No swap needed: ${array[j]} <= ${array[j + 1]}`,
          metrics: { comparisons, swaps },
        }
      }
    }

    yield {
      state: { array: [...array] },
      highlightedIndices: [n - i - 1],
      description: `Element at position ${n - i - 1} is now in its correct position`,
      metrics: { comparisons, swaps },
    }
  }

  yield {
    state: { array: [...array] },
    description: `Bubble Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}`,
    metrics: { comparisons, swaps },
  }
}

