import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export function* selectionSortGenerator(arr: number[]): Generator<StepSnapshot, void, unknown> {
  const array = [...arr]
  let comparisons = 0
  let swaps = 0
  const n = array.length

  yield {
    state: { array: [...array] },
    description: `Starting Selection Sort with array of ${n} elements`,
    metrics: { comparisons, swaps },
  }

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    yield {
      state: { array: [...array] },
      highlightedIndices: [i],
      description: `Pass ${i + 1}: Finding minimum element starting from index ${i}`,
      metrics: { comparisons, swaps },
    }

    for (let j = i + 1; j < n; j++) {
      comparisons++
      yield {
        state: { array: [...array] },
        highlightedIndices: [i, j, minIndex],
        description: `Comparing ${array[j]} with current minimum ${array[minIndex]}`,
        metrics: { comparisons, swaps },
      }

      if (array[j] < array[minIndex]) {
        minIndex = j
        yield {
          state: { array: [...array] },
          highlightedIndices: [i, j, minIndex],
          description: `New minimum found: ${array[minIndex]} at index ${minIndex}`,
          metrics: { comparisons, swaps },
        }
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]]
      swaps++
      yield {
        state: { array: [...array] },
        highlightedIndices: [i, minIndex],
        description: `Swapped ${array[minIndex]} with ${array[i]}`,
        metrics: { comparisons, swaps },
      }
    } else {
      yield {
        state: { array: [...array] },
        highlightedIndices: [i],
        description: `Element at index ${i} is already in correct position`,
        metrics: { comparisons, swaps },
      }
    }
  }

  yield {
    state: { array: [...array] },
    description: `Selection Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}`,
    metrics: { comparisons, swaps },
  }
}

