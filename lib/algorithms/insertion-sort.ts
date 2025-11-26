import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export function* insertionSortGenerator(arr: number[]): Generator<StepSnapshot, void, unknown> {
  const array = [...arr]
  let comparisons = 0
  let swaps = 0
  const n = array.length

  yield {
    state: { array: [...array] },
    description: `Starting Insertion Sort with array of ${n} elements`,
    metrics: { comparisons, swaps },
  }

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    yield {
      state: { array: [...array] },
      highlightedIndices: [i],
      description: `Pass ${i}: Inserting element ${key} at index ${i} into sorted portion`,
      metrics: { comparisons, swaps },
    }

    while (j >= 0) {
      comparisons++
      yield {
        state: { array: [...array] },
        highlightedIndices: [i, j, j + 1],
        description: `Comparing ${key} with ${array[j]}`,
        metrics: { comparisons, swaps },
      }

      if (array[j] > key) {
        array[j + 1] = array[j]
        swaps++
        yield {
          state: { array: [...array] },
          highlightedIndices: [i, j, j + 1],
          description: `Shifting ${array[j]} to position ${j + 1}`,
          metrics: { comparisons, swaps },
        }
        j--
      } else {
        yield {
          state: { array: [...array] },
          highlightedIndices: [i, j, j + 1],
          description: `${key} is in correct position relative to ${array[j]}`,
          metrics: { comparisons, swaps },
        }
        break
      }
    }

    if (j + 1 !== i) {
      array[j + 1] = key
      yield {
        state: { array: [...array] },
        highlightedIndices: [j + 1],
        description: `Inserted ${key} at position ${j + 1}`,
        metrics: { comparisons, swaps },
      }
    }
  }

  yield {
    state: { array: [...array] },
    description: `Insertion Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}`,
    metrics: { comparisons, swaps },
  }
}

