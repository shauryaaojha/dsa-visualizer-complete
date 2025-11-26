"use client"

import { StackVisualizer } from "@/components/visualizer/stack/stack-visualizer-enhanced"
// import Content from "./stack.mdx"

function Content() {
  return (
    <div className="space-y-4">
      <h2>Stack Data Structure</h2>
      <p>
        A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
        Elements are added and removed from the same end, called the "top" of the stack.
      </p>
      <h3>Operations</h3>
      <ul>
        <li><strong>Push:</strong> Add an element to the top of the stack</li>
        <li><strong>Pop:</strong> Remove and return the top element</li>
        <li><strong>Peek:</strong> View the top element without removing it</li>
      </ul>
      <h3>Time Complexity</h3>
      <ul>
        <li>Push: O(1)</li>
        <li>Pop: O(1)</li>
        <li>Peek: O(1)</li>
      </ul>
    </div>
  )
}

export default function StackPage() {
  return <StackVisualizer content={<Content />} />
} 