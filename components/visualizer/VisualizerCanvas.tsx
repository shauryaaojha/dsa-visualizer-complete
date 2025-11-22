import { Card } from '@/components/ui/Card';
import { StepState, HighlightType, VisualizerKind } from '@/lib/algorithms/types';

interface VisualizerCanvasProps {
    step?: StepState;
    algorithmType: 'sorting' | 'searching' | 'data-structure' | 'graph' | 'application';
    visualizerKind?: VisualizerKind;
}

export function VisualizerCanvas({ step, algorithmType, visualizerKind = 'array' }: VisualizerCanvasProps) {
    if (!step) {
        return (
            <Card className="p-6 h-96 flex items-center justify-center">
                <p className="text-gray-500">Enter input and click Run to start visualization</p>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visualization</h2>
            <div className="min-h-[300px]">
                {(visualizerKind === 'array' || step.array) && <ArrayVisualizer step={step} />}
                {visualizerKind === 'linked-list' && step.linkedList && <LinkedListVisualizer step={step} />}
                {visualizerKind === 'stack' && step.stack && <StackVisualizer step={step} />}
                {visualizerKind === 'queue' && step.queue && <QueueVisualizer step={step} />}
                {visualizerKind === 'tree' && step.tree && <TreeVisualizer step={step} />}
                {visualizerKind === 'heap' && step.heap && <HeapVisualizer step={step} />}
                {visualizerKind === 'hash-table' && step.hashTable && <HashTableVisualizer step={step} />}
                {visualizerKind === 'graph' && step.graph && <GraphVisualizer step={step} />}
            </div>
        </Card>
    );
}

// Array Visualizer
function ArrayVisualizer({ step }: { step: StepState }) {
    if (!step.array) return null;

    const maxValue = Math.max(...step.array);
    const minValue = Math.min(...step.array);

    const getHighlightColor = (type: HighlightType): string => {
        const colors: Record<HighlightType, string> = {
            compare: 'bg-yellow-400 border-yellow-600',
            swap: 'bg-red-400 border-red-600',
            pivot: 'bg-purple-400 border-purple-600',
            found: 'bg-green-400 border-green-600',
            low: 'bg-blue-300 border-blue-500',
            high: 'bg-blue-300 border-blue-500',
            mid: 'bg-orange-400 border-orange-600',
            current: 'bg-yellow-300 border-yellow-500',
            selected: 'bg-pink-400 border-pink-600',
            sorted: 'bg-green-300 border-green-500',
            visiting: 'bg-blue-400 border-blue-600',
            visited: 'bg-gray-400 border-gray-600',
            path: 'bg-purple-500 border-purple-700',
            active: 'bg-red-500 border-red-700',
        };
        return colors[type] || 'bg-gray-300 border-gray-500';
    };

    const isHighlighted = (index: number): { highlighted: boolean; type?: HighlightType } => {
        if (!step.highlights) return { highlighted: false };
        const highlighted = step.highlights.indices.includes(index);
        return { highlighted, type: highlighted ? step.highlights.type : undefined };
    };

    return (
        <div className="flex items-end justify-center gap-2 p-4">
            {step.array.map((value, index) => {
                const { highlighted, type } = isHighlighted(index);
                const heightPercent = ((value - minValue) / (maxValue - minValue || 1)) * 80 + 20;

                return (
                    <div key={index} className="flex flex-col items-center gap-2" style={{ flex: '1 1 0', maxWidth: '80px' }}>
                        <div className={`w-full rounded-t-md border-2 transition-all duration-300 ${highlighted && type ? getHighlightColor(type) : 'bg-primary-200 border-primary-400'}`} style={{ height: `${heightPercent}%`, minHeight: '40px' }} />
                        <div className="text-sm font-semibold text-gray-700">{value}</div>
                        {highlighted && type && <div className="text-xs text-gray-500 capitalize">{type}</div>}
                    </div>
                );
            })}
        </div>
    );
}

// Queue Visualizer
function QueueVisualizer({ step }: { step: StepState }) {
    if (!step.queue) return null;

    const { elements, front, rear, type } = step.queue;

    return (
        <div className=" p-6">
            <div className="text-sm font-semibold text-gray-700 mb-3">
                {type === 'circular' ? 'Circular Queue' : 'Linear Queue'} - Front: {front}, Rear: {rear}
            </div>
            <div className="flex items-center justify-center gap-2">
                {elements.map((value, index) => (
                    <div
                        key={index}
                        className={`px-4 py-3 border-2 ${index === front && index === rear
                                ? 'bg-purple-300 border-purple-600'
                                : index === front
                                    ? 'bg-green-300 border-green-600'
                                    : index === rear
                                        ? 'bg-blue-300 border-blue-600'
                                        : value === -1
                                            ? 'bg-gray-100 border-gray-300'
                                            : 'bg-blue-100 border-blue-400'
                            } transition-all text-center font-semibold min-w-[60px]`}
                    >
                        {value === -1 ? '-' : value}
                        {index === front && <div className="text-[10px]">FRONT</div>}
                        {index === rear && <div className="text-[10px]">REAR</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Heap Visualizer
function HeapVisualizer({ step }: { step: StepState }) {
    if (!step.heap) return null;

    const { array, type, highlights } = step.heap;

    return (
        <div className="p-6">
            <div className="text-sm font-semibold text-gray-700 mb-3">
                {type === 'min' ? 'Min Heap' : 'Max Heap'} (Array Representation)
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {array.map((value, index) => {
                    const isHighlighted = highlights?.indices.includes(index);
                    return (
                        <div
                            key={index}
                            className={`px-4 py-3 rounded-lg border-2 ${isHighlighted
                                    ? highlights?.type === 'swap'
                                        ? 'bg-red-300 border-red-600'
                                        : highlights?.type === 'compare'
                                            ? 'bg-yellow-300 border-yellow-600'
                                            : 'bg-blue-300 border-blue-600'
                                    : 'bg-blue-100 border-blue-400'
                                } transition-all text-center font-bold min-w-[60px]`}
                        >
                            <div className="text-lg">{value}</div>
                            <div className="text-[10px] text-gray-600">[{index}]</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Hash Table Visualizer
function HashTableVisualizer({ step }: { step: StepState }) {
    if (!step.hashTable) return null;

    const { buckets, hashFunction, collisionMethod } = step.hashTable;

    return (
        <div className="p-6">
            <div className="text-sm font-semibold text-gray-700 mb-2">
                Hash Function: {hashFunction} | Collision: {collisionMethod}
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
                {buckets.map((bucket) => (
                    <div
                        key={bucket.index}
                        className={`p-3 border-2 rounded ${bucket.highlight === 'found'
                                ? 'bg-green-300 border-green-600'
                                : bucket.highlight === 'compare'
                                    ? 'bg-yellow-300 border-yellow-600'
                                    : bucket.status === 'occupied'
                                        ? 'bg-blue-100 border-blue-400'
                                        : 'bg-gray-50 border-gray-300'
                            } transition-all`}
                    >
                        <div className="text-xs text-gray-600">[{bucket.index}]</div>
                        <div className="text-sm font-bold text-center mt-1">
                            {bucket.status === 'empty' ? '-' : bucket.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Linked List, Stack, Tree, Graph visualizers (unchanged from before)
function LinkedListVisualizer({ step }: { step: StepState }) {
    if (!step.linkedList) return null;
    const { nodes, head, type } = step.linkedList;

    const getHighlightColor = (highlight?: HighlightType): string => {
        if (!highlight) return 'bg-blue-100 border-blue-400';
        const colors: Record<HighlightType, string> = {
            current: 'bg-yellow-300 border-yellow-600',
            compare: 'bg-orange-300 border-orange-600',
            found: 'bg-green-300 border-green-600',
            visiting: 'bg-purple-300 border-purple-600',
            visited: 'bg-gray-300 border-gray-500',
            swap: 'bg-red-300 border-red-600',
            pivot: 'bg-pink-300 border-pink-600',
            selected: 'bg-indigo-300 border-indigo-600',
            sorted: 'bg-teal-300 border-teal-600',
            low: 'bg-blue-200 border-blue-400',
            high: 'bg-blue-200 border-blue-400',
            mid: 'bg-orange-200 border-orange-400',
            path: 'bg-purple-400 border-purple-600',
            active: 'bg-red-400 border-red-600',
        };
        return colors[highlight] || 'bg-blue-100 border-blue-400';
    };

    return (
        <div className="flex items-center justify-start gap-4 p-6 overflow-x-auto">
            {head && (() => {
                const orderedNodes: typeof nodes = [];
                let current = head;
                const visited = new Set<string>();

                while (current && !visited.has(current)) {
                    visited.add(current);
                    const node = nodes.find(n => n.id === current);
                    if (!node) break;
                    orderedNodes.push(node);
                    current = node.next || '';
                    if (type.includes('circular') && current === head) break;
                }

                return orderedNodes.map((node, index) => (
                    <div key={node.id} className="flex items-center gap-2">
                        <div className={`px-6 py-4 rounded-lg border-2 ${getHighlightColor(node.highlight)} transition-all shadow-md`}>
                            <div className="text-lg font-bold text-gray-800">{node.value}</div>
                            <div className="text-xs text-gray-600 mt-1">{node.id}</div>
                        </div>
                        {node.next && (
                            <div className="flex items-center">
                                <div className="text-2xl text-gray-600">&rarr;</div>
                            </div>
                        )}
                        {type.includes('circular') && index === orderedNodes.length - 1 && node.next === head && (
                            <div className="text-sm text-gray-500">(circular → head)</div>
                        )}
                    </div>
                ));
            })()}
        </div>
    );
}

function StackVisualizer({ step }: { step: StepState }) {
    if (!step.stack) return null;
    const { elements, top } = step.stack;

    return (
        <div className="flex flex-col-reverse items-center justify-end p-6 h-96">
            <div className="text-sm text-gray-600 mb-4">Bottom</div>
            {elements.map((value, index) => (
                <div
                    key={index}
                    className={`w-32 py-3 px-4 border-2 ${index === top ? 'bg-yellow-300 border-yellow-600' : 'bg-blue-100 border-blue-400'
                        } transition-all mb-1 text-center font-semibold`}
                >
                    {value}
                    {index === top && <span className="text-xs ml-2">(TOP)</span>}
                </div>
            ))}
            <div className="text-sm text-gray-600 mt-4">Top</div>
        </div>
    );
}

function TreeVisualizer({ step }: { step: StepState }) {
    if (!step.tree) return null;
    const { nodes, root } = step.tree;

    const getHighlightColor = (highlight?: HighlightType): string => {
        if (!highlight) return 'bg-blue-100 border-blue-400';
        const colors: Record<HighlightType, string> = {
            current: 'bg-yellow-300 border-yellow-600',
            compare: 'bg-orange-300 border-orange-600',
            found: 'bg-green-300 border-green-600',
            visiting: 'bg-purple-300 border-purple-600',
            visited: 'bg-gray-300 border-gray-500',
            swap: 'bg-red-300 border-red-600',
            pivot: 'bg-pink-300 border-pink-600',
            selected: 'bg-indigo-300 border-indigo-600',
            sorted: 'bg-teal-300 border-teal-600',
            low: 'bg-blue-200 border-blue-400',
            high: 'bg-blue-200 border-blue-400',
            mid: 'bg-orange-200 border-orange-400',
            path: 'bg-purple-400 border-purple-600',
            active: 'bg-red-400 border-red-600',
        };
        return colors[highlight] || 'bg-blue-100 border-blue-400';
    };

    return (
        <div className="p-6 overflow-auto">
            <div className="text-sm text-gray-600 mb-4">Tree Structure:</div>
            <div className="flex flex-wrap gap-3">
                {nodes.map((node) => (
                    <div key={node.id} className={`px-4 py-3 rounded-lg border-2 ${getHighlightColor(node.highlight)} transition-all shadow`}>
                        <div className="text-lg font-bold">{node.value}</div>
                        {node.id === root && <div className="text-xs text-gray-600">(ROOT)</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function GraphVisualizer({ step }: { step: StepState }) {
    if (!step.graph) return null;
    const { nodes, edges } = step.graph;

    const getHighlightColor = (highlight?: HighlightType): string => {
        if (!highlight) return 'bg-blue-100 border-blue-400';
        const colors: Record<HighlightType, string> = {
            visiting: 'bg-yellow-300 border-yellow-600',
            visited: 'bg-green-300 border-green-500',
            current: 'bg-orange-300 border-orange-600',
            compare: 'bg-purple-200 border-purple-400',
            found: 'bg-green-400 border-green-600',
            path: 'bg-purple-400 border-purple-600',
            active: 'bg-red-400 border-red-600',
            swap: 'bg-red-300 border-red-500',
            pivot: 'bg-pink-300 border-pink-500',
            selected: 'bg-indigo-300 border-indigo-500',
            sorted: 'bg-teal-300 border-teal-500',
            low: 'bg-blue-200 border-blue-400',
            high: 'bg-blue-200 border-blue-400',
            mid: 'bg-orange-200 border-orange-400',
        };
        return colors[highlight] || 'bg-blue-100 border-blue-400';
    };

    return (
        <div className="relative p-6" style={{ height: '400px' }}>
            <svg className="absolute inset-0" width="100%" height="100%">
                {edges.map((edge, idx) => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    return (
                        <line
                            key={idx}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="#94a3b8"
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className={`absolute px-4 py-3 rounded-full border-2 ${getHighlightColor(node.highlight)} transition-all shadow-lg transform -translate-x-1/2 -translate-y-1/2`}
                    style={{ left: node.x, top: node.y }}
                >
                    <div className="text-sm font-bold">{node.label}</div>
                    {node.distance !== undefined && node.distance !== Infinity && (
                        <div className="text-xs text-gray-600">d:{node.distance}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
