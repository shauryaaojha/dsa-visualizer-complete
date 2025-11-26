import { CircularQueueVisualizer } from "@/components/visualizer/circular-queue/circular-queue-visualizer"

export default function CircularQueuePage() {
  return (
    <CircularQueueVisualizer
      content={
        <div>
          <h2>Circular Queue</h2>
          <p>
            A circular queue (ring buffer) is a linear data structure that follows the FIFO principle
            but reuses empty spaces efficiently. When the rear reaches the end, it wraps around to the beginning.
          </p>
          <h3>Operations</h3>
          <ul>
            <li><strong>Enqueue:</strong> Add an element to the rear</li>
            <li><strong>Dequeue:</strong> Remove an element from the front</li>
          </ul>
          <h3>Time Complexity</h3>
          <ul>
            <li>Enqueue: O(1)</li>
            <li>Dequeue: O(1)</li>
          </ul>
        </div>
      }
    />
  )
}

