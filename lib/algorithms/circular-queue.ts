import { StepSnapshot } from "@/components/visualizer/PlaybackControls"

export interface CircularQueueState {
  array: (number | null)[]
  front: number
  rear: number
  size: number
  capacity: number
}

export function* circularQueueEnqueueGenerator(
  state: CircularQueueState,
  value: number
): Generator<StepSnapshot, CircularQueueState, unknown> {
  let currentState = { ...state }
  const { array, front, rear, size, capacity } = currentState

  yield {
    state: { ...currentState },
    description: `Attempting to enqueue ${value}`,
    metrics: { size, capacity },
  }

  if (size >= capacity) {
    yield {
      state: { ...currentState },
      description: `Queue is full! Cannot enqueue ${value}`,
      metrics: { size, capacity },
    }
    return currentState
  }

  const newRear = (rear + 1) % capacity
  const newArray = [...array]
  newArray[newRear] = value

  currentState = {
    array: newArray,
    front: size === 0 ? newRear : front,
    rear: newRear,
    size: size + 1,
    capacity,
  }

  yield {
    state: { ...currentState },
    description: `Enqueued ${value} at position ${newRear}. Front: ${currentState.front}, Rear: ${currentState.rear}`,
    metrics: { size: currentState.size, capacity },
  }

  return currentState
}

export function* circularQueueDequeueGenerator(
  state: CircularQueueState
): Generator<StepSnapshot, CircularQueueState, unknown> {
  let currentState = { ...state }
  const { array, front, rear, size, capacity } = currentState

  yield {
    state: { ...currentState },
    description: `Attempting to dequeue`,
    metrics: { size, capacity },
  }

  if (size === 0) {
    yield {
      state: { ...currentState },
      description: `Queue is empty! Cannot dequeue`,
      metrics: { size, capacity },
    }
    return currentState
  }

  const value = array[front]
  const newArray = [...array]
  newArray[front] = null

  const newFront = size === 1 ? -1 : (front + 1) % capacity
  const newRear = size === 1 ? -1 : rear

  currentState = {
    array: newArray,
    front: newFront,
    rear: newRear,
    size: size - 1,
    capacity,
  }

  yield {
    state: { ...currentState },
    description: `Dequeued ${value} from position ${front}. Front: ${currentState.front}, Rear: ${currentState.rear}`,
    metrics: { size: currentState.size, capacity },
  }

  return currentState
}

export function createInitialCircularQueueState(capacity: number): CircularQueueState {
  return {
    array: Array(capacity).fill(null),
    front: -1,
    rear: -1,
    size: 0,
    capacity,
  }
}

