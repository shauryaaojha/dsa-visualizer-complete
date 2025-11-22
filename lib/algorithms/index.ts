import { AlgorithmConfig } from './types';
import { bubbleSortSteps } from './sorting/bubbleSort';
import { selectionSortSteps } from './sorting/selectionSort';
import { insertionSortSteps } from './sorting/insertionSort';
import { linearSearchSteps } from './searching/linearSearch';
import { binarySearchSteps } from './searching/binarySearch';
import { singlyLinkedListSteps } from './data-structures/linkedList';
import { stackOperationsSteps } from './data-structures/stack';
import { queueOperationsSteps, circularQueueSteps } from './data-structures/queue';
import { bstOperationsSteps } from './data-structures/bst';
import { minHeapSteps } from './data-structures/heap';
import { hashTableLinearProbingSteps } from './data-structures/hashTable';
import { treeTraversalSteps } from './data-structures/treeTraversal';
import { dfsSteps, bfsSteps } from './graphs/graphTraversal';
import { dijkstraSteps } from './graphs/dijkstra';
import { infixToPostfixSteps } from './applications/infixToPostfix';

// ==========================================
// COMPLETE ALGORITHM REGISTRY
// ==========================================

export const algorithms = {
    // MODULE 1 - Sorting & Searching
    sorting: {
        'bubble-sort': {
            name: 'Bubble Sort',
            description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.',
            type: 'sorting',
            visualizerKind: 'array',
            inputType: 'array',
            module: 1,
            code: [
                'function bubbleSort(array):',
                '  for i from 0 to n-2:',
                '    swapped = false',
                '    for j from 0 to n-i-2:',
                '      if array[j] > array[j+1]:',
                '        swap(array[j], array[j+1])',
                '        swapped = true',
                '    if not swapped: break',
                '  return array',
            ],
            execute: bubbleSortSteps,
        } as AlgorithmConfig,
        'selection-sort': {
            name: 'Selection Sort',
            description: 'Divides input into sorted and unsorted regions, repeatedly selecting the smallest element.',
            type: 'sorting',
            visualizerKind: 'array',
            inputType: 'array',
            module: 1,
            code: [
                'function selectionSort(array):',
                '  for i from 0 to n-2:',
                '    minIndex = i',
                '    for j from i+1 to n-1:',
                '      if array[j] < array[minIndex]:',
                '        minIndex = j',
                '    if minIndex != i:',
                '      swap(array[i], array[minIndex])',
                '  return array',
            ],
            execute: selectionSortSteps,
        } as AlgorithmConfig,
        'insertion-sort': {
            name: 'Insertion Sort',
            description: 'Builds final sorted array one item at a time by inserting elements into proper position.',
            type: 'sorting',
            visualizerKind: 'array',
            inputType: 'array',
            module: 1,
            code: [
                'function insertionSort(array):',
                '  for i from 1 to n-1:',
                '    key = array[i]',
                '    j = i - 1',
                '    while j >= 0 and array[j] > key:',
                '      array[j+1] = array[j]',
                '      j = j - 1',
                '    array[j+1] = key',
                '  return array',
            ],
            execute: insertionSortSteps,
        } as AlgorithmConfig,
    },

    searching: {
        'linear-search': {
            name: 'Linear Search',
            description: 'Sequential search checking every element until target is found.',
            type: 'searching',
            visualizerKind: 'array',
            inputType: 'array-target',
            module: 1,
            code: [
                'function linearSearch(array, target):',
                '  for i from 0 to n-1:',
                '    if array[i] == target:',
                '      return i',
                '  return -1',
            ],
            execute: (array: number[], target?: number) => {
                if (target === undefined) throw new Error('Target required');
                return linearSearchSteps(array, target);
            },
        } as AlgorithmConfig,
        'binary-search': {
            name: 'Binary Search',
            description: 'Efficient search on sorted array by halving search space each iteration.',
            type: 'searching',
            visualizerKind: 'array',
            inputType: 'array-target',
            module: 1,
            code: [
                'function binarySearch(array, target):',
                '  low = 0, high = n - 1',
                '  while low <= high:',
                '    mid = floor((low + high) / 2)',
                '    if array[mid] == target:',
                '      return mid',
                '    else if array[mid] < target:',
                '      low = mid + 1',
                '    else:',
                '      high = mid - 1',
                '  return -1',
            ],
            execute: (array: number[], target?: number) => {
                if (target === undefined) throw new Error('Target required');
                return binarySearchSteps(array, target);
            },
        } as AlgorithmConfig,
    },

    // MODULE 2 - Arrays & Linked Lists
    'linked-lists': {
        'singly-linked-list': {
            name: 'Singly Linked List',
            description: 'Linear data structure where each element points to the next element.',
            type: 'data-structure',
            visualizerKind: 'linked-list',
            inputType: 'custom',
            module: 2,
            exerciseNumber: 5,
            operations: ['insert-beginning', 'insert-end', 'delete-beginning', 'search'],
            code: [
                'struct Node { int data; Node* next; };',
                'void insertAtBeginning(value):',
                '  newNode = createNode(value)',
                '  newNode->next = head',
                '  head = newNode',
                'void search(value):',
                '  current = head',
                '  while current != NULL:',
                '    if current->data == value: return true',
                '    current = current->next',
            ],
            execute: (operation: { op: string; value?: number }) => {
                return singlyLinkedListSteps(operation.op, operation.value);
            },
            defaultInput: { op: 'insert-beginning', value: 5 },
        } as AlgorithmConfig,
    },

    // MODULE 3 - Stacks & Queues
    'stacks-queues': {
        'stack-array': {
            name: 'Stack (Array Implementation)',
            description: 'LIFO data structure with push, pop, and peek operations.',
            type: 'data-structure',
            visualizerKind: 'stack',
            inputType: 'custom',
            module: 3,
            exerciseNumber: 7,
            operations: ['push', 'pop', 'peek'],
            code: [
                'int stack[MAX], top = -1;',
                'void push(value):',
                '  if top >= MAX-1: overflow',
                '  stack[++top] = value',
                'int pop():',
                '  if top < 0: underflow',
                '  return stack[top--]',
                'int peek():',
                '  return stack[top]',
            ],
            execute: (operations: Array<{ op: 'push' | 'pop' | 'peek', value?: number }>) => {
                return stackOperationsSteps(operations);
            },
            defaultInput: [
                { op: 'push', value: 10 },
                { op: 'push', value: 20 },
                { op: 'push', value: 30 },
                { op: 'pop' },
                { op: 'peek' },
            ],
        } as AlgorithmConfig,

        'queue-array': {
            name: 'Queue (Array Implementation)',
            description: 'FIFO data structure with enqueue and dequeue operations.',
            type: 'data-structure',
            visualizerKind: 'queue',
            inputType: 'custom',
            module: 3,
            exerciseNumber: 8,
            operations: ['enqueue', 'dequeue', 'peek'],
            code: [
                'int queue[MAX], front = 0, rear = -1;',
                'void enqueue(value):',
                '  if rear >= MAX-1: overflow',
                '  queue[++rear] = value',
                'int dequeue():',
                '  if front > rear: underflow',
                '  return queue[front++]',
                'int peek():',
                '  return queue[front]',
            ],
            execute: (operations: Array<{ op: 'enqueue' | 'dequeue' | 'peek', value?: number }>) => {
                return queueOperationsSteps(operations);
            },
            defaultInput: [
                { op: 'enqueue', value: 10 },
                { op: 'enqueue', value: 20 },
                { op: 'enqueue', value: 30 },
                { op: 'dequeue' },
                { op: 'peek' },
            ],
        } as AlgorithmConfig,

        'circular-queue': {
            name: 'Circular Queue',
            description: 'Queue where last position connects to first, utilizing space efficiently.',
            type: 'data-structure',
            visualizerKind: 'queue',
            inputType: 'custom',
            module: 3,
            exerciseNumber: 8,
            operations: ['enqueue', 'dequeue'],
            code: [
                'int queue[MAX], front = -1, rear = -1, size = 0;',
                'void enqueue(value):',
                '  if size == MAX: overflow',
                '  if front == -1: front = 0',
                '  rear = (rear + 1) % MAX',
                '  queue[rear] = value',
                '  size++',
                'int dequeue():',
                '  if size == 0: underflow',
                '  value = queue[front]',
                '  front = (front + 1) % MAX',
                '  size--',
                '  return value',
            ],
            execute: (operations: Array<{ op: 'enqueue' | 'dequeue', value?: number }>) => {
                return circularQueueSteps(operations);
            },
            defaultInput: [
                { op: 'enqueue', value: 10 },
                { op: 'enqueue', value: 20 },
                { op: 'enqueue', value: 30 },
                { op: 'dequeue' },
                { op: 'enqueue', value: 40 },
                { op: 'enqueue', value: 50 },
            ],
        } as AlgorithmConfig,

        'infix-to-postfix': {
            name: 'Infix to Postfix Conversion',
            description: 'Convert infix expressions to postfix notation using stack.',
            type: 'application',
            visualizerKind: 'stack',
            inputType: 'custom',
            module: 3,
            exerciseNumber: 9,
            code: [
                'function infixToPostfix(expression):',
                '  stack = empty stack',
                '  for each character in expression:',
                '    if operand: add to output',
                '    if "(": push to stack',
                '    if ")": pop until "("',
                '    if operator:',
                '      pop higher/equal precedence ops',
                '      push current operator',
                '  pop remaining operators',
            ],
            execute: (input: string) => {
                return infixToPostfixSteps(input || 'A+B*C');
            },
            defaultInput: 'A+B*C',
        } as AlgorithmConfig,
    },

    // MODULE 4 - Trees, Heaps & Hashing
    trees: {
        'binary-search-tree': {
            name: 'Binary Search Tree (BST)',
            description: 'Binary tree where left child < parent < right child for efficient search.',
            type: 'data-structure',
            visualizerKind: 'tree',
            inputType: 'custom',
            module: 4,
            exerciseNumber: 11,
            operations: ['insert', 'search'],
            code: [
                'struct Node { int data; Node *left, *right; };',
                'void insert(root, value):',
                '  if root == NULL: return newNode(value)',
                '  if value < root->data:',
                '    root->left = insert(root->left, value)',
                '  else:',
                '    root->right = insert(root->right, value)',
                '  return root',
            ],
            execute: (operation: { op: string; value?: number }) => {
                return bstOperationsSteps(operation.op, operation.value);
            },
            defaultInput: { op: 'insert', value: 25 },
        } as AlgorithmConfig,

        'tree-traversal-inorder': {
            name: 'Tree Traversal - Inorder',
            description: 'Visit left subtree, root, then right subtree (gives sorted order for BST).',
            type: 'data-structure',
            visualizerKind: 'tree',
            inputType: 'custom',
            module: 4,
            exerciseNumber: 10,
            code: [
                'function inorder(root):',
                '  if root == NULL: return',
                '  inorder(root->left)',
                '  visit(root)',
                '  inorder(root->right)',
            ],
            execute: () => treeTraversalSteps('inorder'),
            defaultInput: null,
        } as AlgorithmConfig,

        'tree-traversal-preorder': {
            name: 'Tree Traversal - Preorder',
            description: 'Visit root, then left subtree, then right subtree.',
            type: 'data-structure',
            visualizerKind: 'tree',
            inputType: 'custom',
            module: 4,
            exerciseNumber: 10,
            code: [
                'function preorder(root):',
                '  if root == NULL: return',
                '  visit(root)',
                '  preorder(root->left)',
                '  preorder(root->right)',
            ],
            execute: () => treeTraversalSteps('preorder'),
            defaultInput: null,
        } as AlgorithmConfig,

        'tree-traversal-postorder': {
            name: 'Tree Traversal - Postorder',
            description: 'Visit left subtree, right subtree, then root.',
            type: 'data-structure',
            visualizerKind: 'tree',
            inputType: 'custom',
            module: 4,
            exerciseNumber: 10,
            code: [
                'function postorder(root):',
                '  if root == NULL: return',
                '  postorder(root->left)',
                '  postorder(root->right)',
                '  visit(root)',
            ],
            execute: () => treeTraversalSteps('postorder'),
            defaultInput: null,
        } as AlgorithmConfig,

        'min-heap': {
            name: 'Min Heap Operations',
            description: 'Complete binary tree where each parent is smaller than its children.',
            type: 'data-structure',
            visualizerKind: 'heap',
            inputType: 'custom',
            module: 4,
            operations: ['insert', 'extract-min'],
            code: [
                'function insert(value):',
                '  heap.push(value)',
                '  heapifyUp(heap.size - 1)',
                'function heapifyUp(index):',
                '  parent = (index - 1) / 2',
                '  if heap[index] < heap[parent]:',
                '    swap(heap[index], heap[parent])',
                '    heapifyUp(parent)',
            ],
            execute: (operation: { op: string; value?: number }) => {
                return minHeapSteps(operation.op, operation.value);
            },
            defaultInput: { op: 'insert', value: 10 },
        } as AlgorithmConfig,

        'hash-table': {
            name: 'Hash Table (Linear Probing)',
            description: 'Hash table with collision resolution using linear probing.',
            type: 'data-structure',
            visualizerKind: 'hash-table',
            inputType: 'custom',
            module: 4,
            operations: ['insert', 'search'],
            code: [
                'function hash(key): return key % size',
                'function insert(key):',
                '  index = hash(key)',
                '  while table[index] != empty:',
                '    index = (index + 1) % size',
                '  table[index] = key',
                'function search(key):',
                '  index = hash(key)',
                '  while table[index] != empty:',
                '    if table[index] == key: return true',
                '    index = (index + 1) % size',
            ],
            execute: (operations: Array<{ op: 'insert' | 'search', value: number }>) => {
                return hashTableLinearProbingSteps(operations);
            },
            defaultInput: [
                { op: 'insert', value: 15 },
                { op: 'insert', value: 25 },
                { op: 'insert', value: 35 },
                { op: 'search', value: 25 },
            ],
        } as AlgorithmConfig,
    },

    // MODULE 5 - Graph Algorithms
    graphs: {
        'dfs': {
            name: 'Depth-First Search (DFS)',
            description: 'Graph traversal exploring as far as possible before backtracking.',
            type: 'graph',
            visualizerKind: 'graph',
            inputType: 'custom',
            module: 5,
            exerciseNumber: 13,
            code: [
                'function DFS(graph, start):',
                '  mark start as visited',
                '  for each neighbor of start:',
                '    if neighbor not visited:',
                '      DFS(graph, neighbor)',
            ],
            execute: (graphInput: { nodes: string[]; edges: [string, string][] }) => {
                return dfsSteps(graphInput);
            },
            defaultInput: {
                nodes: ['A', 'B', 'C', 'D', 'E'],
                edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E']],
            },
        } as AlgorithmConfig,

        'bfs': {
            name: 'Breadth-First Search (BFS)',
            description: 'Graph traversal exploring all neighbors before moving to next level.',
            type: 'graph',
            visualizerKind: 'graph',
            inputType: 'custom',
            module: 5,
            exerciseNumber: 13,
            code: [
                'function BFS(graph, start):',
                '  queue = [start]',
                '  mark start as visited',
                '  while queue not empty:',
                '    current = queue.dequeue()',
                '    for each neighbor of current:',
                '      if neighbor not visited:',
                '        mark visited',
                '        queue.enqueue(neighbor)',
            ],
            execute: (graphInput: { nodes: string[]; edges: [string, string][] }) => {
                return bfsSteps(graphInput);
            },
            defaultInput: {
                nodes: ['A', 'B', 'C', 'D', 'E'],
                edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'E']],
            },
        } as AlgorithmConfig,

        'dijkstra': {
            name: "Dijkstra's Shortest Path",
            description: 'Find shortest paths from source to all vertices in weighted graph.',
            type: 'graph',
            visualizerKind: 'graph',
            inputType: 'custom',
            module: 5,
            exerciseNumber: 14,
            code: [
                'function dijkstra(graph, source):',
                '  distance[source] = 0',
                '  for all other vertices: distance = ∞',
                '  while unvisited vertices exist:',
                '    u = vertex with min distance',
                '    for each neighbor v of u:',
                '      alt = distance[u] + weight(u, v)',
                '      if alt < distance[v]:',
                '        distance[v] = alt',
            ],
            execute: (input: { nodes: string[]; edges: Array<[string, string, number]>; source: string }) => {
                return dijkstraSteps(input);
            },
            defaultInput: {
                nodes: ['A', 'B', 'C', 'D'],
                edges: [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 3]],
                source: 'A',
            },
        } as AlgorithmConfig,
    },
};

export function getAllAlgorithms(): Array<{ category: string; slug: string; config: AlgorithmConfig }> {
    const result: Array<{ category: string; slug: string; config: AlgorithmConfig }> = [];

    Object.keys(algorithms).forEach(category => {
        const categoryAlgos = algorithms[category as keyof typeof algorithms];
        Object.keys(categoryAlgos).forEach(slug => {
            result.push({
                category,
                slug,
                config: categoryAlgos[slug as keyof typeof categoryAlgos],
            });
        });
    });

    return result;
}
