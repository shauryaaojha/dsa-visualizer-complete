import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer"

export default function BubbleSortPage() {
  return (
    <SortingVisualizer
      algorithm="bubble"
      title="Bubble Sort"
      content={
        <div>
          <h2>Bubble Sort</h2>
          <p>
            Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
            compares adjacent elements and swaps them if they are in the wrong order.
            The pass through the list is repeated until the list is sorted.
          </p>
          <h3>Time Complexity</h3>
          <ul>
            <li>Best Case: O(n) - when array is already sorted</li>
            <li>Average Case: O(n²)</li>
            <li>Worst Case: O(n²)</li>
          </ul>
          <h3>Space Complexity</h3>
          <p>O(1) - in-place sorting algorithm</p>
        </div>
      }
    />
  )
}

