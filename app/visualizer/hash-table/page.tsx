import { HashTableVisualizer } from "@/components/visualizer/hash-table/hash-table-visualizer"

export default function HashTablePage() {
  return (
    <HashTableVisualizer
      content={
        <div>
          <h2>Hash Table (Linear Probing)</h2>
          <p>
            A hash table is a data structure that implements an associative array using a hash function
            to map keys to array indices. Linear probing is a collision resolution technique that searches
            for the next available slot when a collision occurs.
          </p>
          <h3>Operations</h3>
          <ul>
            <li><strong>Insert:</strong> Add a key-value pair</li>
            <li><strong>Search:</strong> Find a key in the table</li>
          </ul>
          <h3>Time Complexity</h3>
          <ul>
            <li>Average Case: O(1)</li>
            <li>Worst Case: O(n) - when all slots are filled</li>
          </ul>
        </div>
      }
    />
  )
}

