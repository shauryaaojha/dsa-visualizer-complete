import { SortingVisualizer } from "@/components/visualizer/sorting/sorting-visualizer"

export default function SelectionSortPage() {
  return (
    <SortingVisualizer
      algorithm="selection"
      title="Selection Sort"
      content={
        <div>
          <h2>Selection Sort</h2>
          <p>
            Selection Sort is an in-place comparison sorting algorithm. It finds the minimum element
            from the unsorted portion and places it at the beginning. This process is repeated for
            the remaining unsorted portion.
          </p>
          <h3>Time Complexity</h3>
          <ul>
            <li>Best Case: O(n²)</li>
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

