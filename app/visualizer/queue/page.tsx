"use client"

import { QueueVisualizer } from "@/components/visualizer/queue/queue-visualizer-enhanced"
// import Content from "./queue.mdx"

function Content() {
  return (
    <div className="space-y-4">
      <h2>Queue Data Structure</h2>
      <p>
        A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.
        Elements are added at the rear and removed from the front.
      </p>
      <h3>Operations</h3>
      <ul>
        <li><strong>Enqueue:</strong> Add an element to the rear of the queue</li>
        <li><strong>Dequeue:</strong> Remove and return the front element</li>
      </ul>
      <h3>Time Complexity</h3>
      <ul>
        <li>Enqueue: O(1)</li>
        <li>Dequeue: O(1)</li>
      </ul>
    </div>
  )
}

export default function QueuePage() {
  return <QueueVisualizer content={<Content />} />
} 