import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export interface HashTableState {
  table: (number | null)[]
  size: number
  capacity: number
  collisions: number
}

function hash(key: number, capacity: number): number {
  return key % capacity
}

export function* hashTableInsertGenerator(
  state: HashTableState,
  key: number
): Generator<StepSnapshot, HashTableState, unknown> {
  let currentState = { ...state }
  const { table, capacity } = currentState

  yield {
    state: { ...currentState },
    description: `Attempting to insert key ${key}`,
    metrics: { size: currentState.size, capacity, collisions: currentState.collisions },
  }

  let index = hash(key, capacity)
  let originalIndex = index
  let probeCount = 0

  yield {
    state: { ...currentState, currentIndex: index, probeCount },
    description: `Hash function: ${key} % ${capacity} = ${index}`,
    metrics: { size: currentState.size, capacity, collisions: currentState.collisions },
  }

  while (table[index] !== null && table[index] !== key) {
    probeCount++
    currentState.collisions++
    yield {
      state: { ...currentState, currentIndex: index, probeCount },
      description: `Collision at index ${index}! Linear probing to index ${(index + 1) % capacity}`,
      metrics: { size: currentState.size, capacity, collisions: currentState.collisions },
    }
    index = (index + 1) % capacity

    if (index === originalIndex) {
      yield {
        state: { ...currentState },
        description: `Hash table is full! Cannot insert ${key}`,
        metrics: { size: currentState.size, capacity, collisions: currentState.collisions },
      }
      return currentState
    }
  }

  const newTable = [...table]
  const isNewKey = newTable[index] === null
  newTable[index] = key

  currentState = {
    table: newTable,
    size: isNewKey ? currentState.size + 1 : currentState.size,
    capacity,
    collisions: currentState.collisions,
  }

  yield {
    state: { ...currentState },
    description: `${isNewKey ? "Inserted" : "Updated"} key ${key} at index ${index}${probeCount > 0 ? ` (${probeCount} probe${probeCount > 1 ? "s" : ""})` : ""}`,
    metrics: { size: currentState.size, capacity, collisions: currentState.collisions },
  }

  return currentState
}

export function* hashTableSearchGenerator(
  state: HashTableState,
  key: number
): Generator<StepSnapshot, { found: boolean; index: number } | null, unknown> {
  const { table, capacity } = state

  yield {
    state: { ...state },
    description: `Searching for key ${key}`,
    metrics: { size: state.size, capacity, collisions: state.collisions },
  }

  let index = hash(key, capacity)
  let originalIndex = index
  let probeCount = 0

  yield {
    state: { ...state, currentIndex: index, probeCount },
    description: `Hash function: ${key} % ${capacity} = ${index}`,
    metrics: { size: state.size, capacity, collisions: state.collisions },
  }

  while (table[index] !== null) {
    if (table[index] === key) {
      yield {
        state: { ...state, currentIndex: index, probeCount, found: true },
        description: `Found key ${key} at index ${index}${probeCount > 0 ? ` (${probeCount} probe${probeCount > 1 ? "s" : ""})` : ""}`,
        metrics: { size: state.size, capacity, collisions: state.collisions },
      }
      return { found: true, index }
    }

    probeCount++
    yield {
      state: { ...state, currentIndex: index, probeCount },
      description: `Key ${table[index]} ≠ ${key}, probing next index ${(index + 1) % capacity}`,
      metrics: { size: state.size, capacity, collisions: state.collisions },
    }
    index = (index + 1) % capacity

    if (index === originalIndex) {
      break
    }
  }

  yield {
    state: { ...state, found: false },
    description: `Key ${key} not found in hash table`,
    metrics: { size: state.size, capacity, collisions: state.collisions },
  }
  return { found: false, index: -1 }
}

export function createInitialHashTableState(capacity: number): HashTableState {
  return {
    table: Array(capacity).fill(null),
    size: 0,
    capacity,
    collisions: 0,
  }
}

