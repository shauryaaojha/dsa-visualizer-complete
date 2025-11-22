// ==========================================
// CORE TYPES FOR STEP-BASED VISUALIZATION
// ==========================================

export type HighlightType =
    | 'compare'
    | 'swap'
    | 'pivot'
    | 'found'
    | 'low'
    | 'high'
    | 'mid'
    | 'current'
    | 'selected'
    | 'sorted'
    | 'visiting'
    | 'visited'
    | 'path'
    | 'active';

// Base step state for array-based algorithms
export interface StepState {
    array?: number[];
    highlights?: {
        indices: number[];
        type: HighlightType;
    };
    variables?: Record<string, number | string>;
    message: string;
    lineNumber?: number;

    // Extended fields for different data structures
    linkedList?: LinkedListState;
    stack?: StackState;
    queue?: QueueState;
    tree?: TreeState;
    heap?: HeapState;
    hashTable?: HashTableState;
    graph?: GraphState;
    matrix?: MatrixState;
}

// ==========================================
// LINKED LIST STATE
// ==========================================

export interface LinkedListNode {
    value: number;
    id: string;
    next?: string;  // ID of next node
    prev?: string;  // ID of prev node (for doubly)
    highlight?: HighlightType;
}

export interface LinkedListState {
    nodes: LinkedListNode[];
    head?: string;
    tail?: string;
    type: 'singly' | 'doubly' | 'circular-singly' | 'circular-doubly';
}

// ==========================================
// STACK STATE
// ==========================================

export interface StackState {
    elements: number[];
    top: number;
    capacity?: number;
    implementation: 'array' | 'linked-list';
    highlights?: number[];  // indices to highlight
}

// ==========================================
// QUEUE STATE
// ==========================================

export interface QueueState {
    elements: number[];
    front: number;
    rear: number;
    capacity?: number;
    type: 'linear' | 'circular' | 'deque' | 'priority';
    implementation: 'array' | 'linked-list';
    highlights?: number[];
}

// ==========================================
// TREE STATE
// ==========================================

export interface TreeNode {
    value: number;
    id: string;
    left?: string;
    right?: string;
    parent?: string;
    height?: number;  // for AVL
    balanceFactor?: number;  // for AVL
    color?: 'red' | 'black';  // for Red-Black trees
    highlight?: HighlightType;
    x?: number;  // for rendering
    y?: number;  // for rendering
}

export interface TreeState {
    nodes: TreeNode[];
    root?: string;
    type: 'binary' | 'bst' | 'avl' | 'btree' | 'heap';
    heapArray?: number[];  // for heap array representation
}

// ==========================================
// HEAP STATE
// ==========================================

export interface HeapState {
    array: number[];
    type: 'min' | 'max';
    highlights?: {
        indices: number[];
        type: HighlightType;
    };
}

// ==========================================
// HASH TABLE STATE
// ==========================================

export interface HashBucket {
    index: number;
    values: number[];  // for separate chaining
    value?: number;    // for open addressing
    status?: 'empty' | 'occupied' | 'deleted';
    highlight?: HighlightType;
}

export interface HashTableState {
    buckets: HashBucket[];
    size: number;
    collisionMethod: 'linear' | 'quadratic' | 'double-hashing' | 'chaining';
    hashFunction: string;
}

// ==========================================
// GRAPH STATE
// ==========================================

export interface GraphNode {
    id: string;
    label: string;
    x?: number;
    y?: number;
    highlight?: HighlightType;
    distance?: number;  // for shortest path
    parent?: string;    // for path tracking
}

export interface GraphEdge {
    from: string;
    to: string;
    weight?: number;
    directed?: boolean;
    highlight?: HighlightType;
}

export interface GraphState {
    nodes: GraphNode[];
    edges: GraphEdge[];
    adjacencyMatrix?: number[][];
    adjacencyList?: Record<string, string[]>;
    type: 'directed' | 'undirected' | 'weighted';
}

// ==========================================
// MATRIX STATE
// ==========================================

export interface MatrixState {
    matrix: number[][];
    highlights?: {
        row?: number;
        col?: number;
        cells?: [number, number][];
        type: HighlightType;
    };
    dimensions: {
        rows: number;
        cols: number;
    };
}

// ==========================================
// ALGORITHM METADATA
// ==========================================

export interface AlgorithmMeta {
    comparisons: number;
    swaps?: number;
    operations?: number;
    timeComplexity?: string;
    spaceComplexity?: string;
}

export interface AlgorithmResult {
    steps: StepState[];
    meta: AlgorithmMeta;
}

// ==========================================
// ALGORITHM CONFIGURATION
// ==========================================

export type VisualizerKind =
    | 'array'
    | 'linked-list'
    | 'stack'
    | 'queue'
    | 'tree'
    | 'heap'
    | 'hash-table'
    | 'graph'
    | 'matrix'
    | 'application';

export type InputType =
    | 'array'
    | 'array-target'
    | 'linked-list'
    | 'stack-operations'
    | 'queue-operations'
    | 'tree-operations'
    | 'graph-input'
    | 'matrix-input'
    | 'custom';

export interface AlgorithmConfig {
    name: string;
    description: string;
    type: 'sorting' | 'searching' | 'data-structure' | 'graph' | 'application';
    visualizerKind: VisualizerKind;
    inputType: InputType;
    code: string[];
    execute: (input?: any, ...args: any[]) => AlgorithmResult;
    operations?: string[];  // for data structures
    defaultInput?: any;
    module?: number;  // 1-5 for course modules
    exerciseNumber?: number;  // Ex.1, Ex.2, etc.
}
