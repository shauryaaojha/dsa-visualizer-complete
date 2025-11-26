import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer"

export default function InsertionSortPage() {
  return (
    <SortingVisualizer
      algorithm="insertion"
      title="Insertion Sort"
      content={
        <div>
          <h2>Insertion Sort</h2>
          <p>
            Insertion Sort builds the sorted array one item at a time. It is much less efficient
            on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
            However, it is efficient for small data sets and is often used as part of more
            sophisticated algorithms.
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

