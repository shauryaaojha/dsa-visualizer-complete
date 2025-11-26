import { SearchVisualizer } from "@/components/visualizer/search/search-visualizer"

export default function LinearSearchPage() {
  return (
    <SearchVisualizer
      algorithm="linear"
      title="Linear Search"
      content={
        <div>
          <h2>Linear Search</h2>
          <p>
            Linear Search is a simple search algorithm that checks each element in the array
            sequentially until the target element is found or the end of the array is reached.
          </p>
          <h3>Time Complexity</h3>
          <ul>
            <li>Best Case: O(1) - when target is at the first position</li>
            <li>Average Case: O(n)</li>
            <li>Worst Case: O(n)</li>
          </ul>
          <h3>Space Complexity</h3>
          <p>O(1)</p>
        </div>
      }
    />
  )
}

