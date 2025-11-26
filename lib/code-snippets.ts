export const codeSnippets: Record<string, string> = {
  stack: `int stack[MAX], top = -1;

void push(int value) {
  if (top >= MAX - 1) {
    // Stack overflow
    return;
  }
  stack[++top] = value;
}

int pop() {
  if (top < 0) {
    // Stack underflow
    return -1;
  }
  return stack[top--];
}

int peek() {
  if (top < 0) {
    return -1;
  }
  return stack[top];
}`,

  bubbleSort: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,

  selectionSort: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,

  insertionSort: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,

  linearSearch: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`,

  binarySearch: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  return -1; // Not found
}`,

  queue: `int queue[MAX], front = 0, rear = -1;

void enqueue(int value) {
  if (rear >= MAX - 1) {
    // Queue overflow
    return;
  }
  queue[++rear] = value;
}

int dequeue() {
  if (front > rear) {
    // Queue underflow
    return -1;
  }
  return queue[front++];
}`,

  circularQueue: `int queue[MAX], front = -1, rear = -1;

void enqueue(int value) {
  if ((rear + 1) % MAX == front) {
    // Queue is full
    return;
  }
  if (front == -1) front = 0;
  rear = (rear + 1) % MAX;
  queue[rear] = value;
}

int dequeue() {
  if (front == -1) {
    // Queue is empty
    return -1;
  }
  int value = queue[front];
  if (front == rear) {
    front = rear = -1;
  } else {
    front = (front + 1) % MAX;
  }
  return value;
}`,

  hashTable: `class HashTable {
  constructor(size) {
    this.table = new Array(size).fill(null);
    this.size = size;
  }
  
  hash(key) {
    return key % this.size;
  }
  
  insert(key) {
    let index = this.hash(key);
    while (this.table[index] !== null) {
      index = (index + 1) % this.size; // Linear probing
    }
    this.table[index] = key;
  }
  
  search(key) {
    let index = this.hash(key);
    while (this.table[index] !== null) {
      if (this.table[index] === key) {
        return index;
      }
      index = (index + 1) % this.size;
    }
    return -1;
  }
}`,

  linkedList: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  insertFront(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }
  
  deleteFront() {
    if (this.head === null) return;
    this.head = this.head.next;
  }
}`,

  binaryTree: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insert(root, value) {
  if (root === null) {
    return new TreeNode(value);
  }
  if (value <= root.value) {
    root.left = insert(root.left, value);
  } else {
    root.right = insert(root.right, value);
  }
  return root;
}`,

  dfs: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,

  bfs: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,

  heap: `class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] > this.heap[index]) {
        [this.heap[parent], this.heap[index]] = 
        [this.heap[index], this.heap[parent]];
        index = parent;
      } else {
        break;
      }
    }
  }
}`,

  dijkstra: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new PriorityQueue();
  
  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue().element;
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    for (let neighbor in graph[current]) {
      const weight = graph[current][neighbor];
      const distance = distances[current] + weight;
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }
  
  return distances;
}`,
}

