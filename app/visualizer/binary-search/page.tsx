import { SearchVisualizer } from "@/components/visualizer/search/search-visualizer"

export default function BinarySearchPage() {
  return (
    <SearchVisualizer
      algorithm="binary"
      title="Binary Search"
      content={
        <div>
          <h2>Binary Search</h2>
          <p>
            Binary Search is an efficient search algorithm that works on sorted arrays. It repeatedly
            divides the search interval in half. If the value of the search key is less than the item
            in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow
            it to the upper half.
          </p>
          <h3>Time Complexity</h3>
          <ul>
            <li>Best Case: O(1) - when target is at the middle</li>
            <li>Average Case: O(log n)</li>
            <li>Worst Case: O(log n)</li>
          </ul>
          <h3>Space Complexity</h3>
          <p>O(1) - iterative implementation, O(log n) - recursive implementation</p>
        </div>
      }
    />
  )
}

