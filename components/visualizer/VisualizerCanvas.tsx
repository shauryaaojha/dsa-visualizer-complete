import { StepState, HighlightType, VisualizerKind } from '@/lib/algorithms/types';

interface VisualSettings {
    showGrid: boolean;
    showEdgeWeights: boolean;
    showNodeLabels: boolean;
}

interface VisualizerCanvasProps {
    step?: StepState;
    algorithmType: 'sorting' | 'searching' | 'data-structure' | 'graph' | 'application';
    visualizerKind?: VisualizerKind;
    visualSettings?: VisualSettings;
}

const DEFAULT_SETTINGS: VisualSettings = {
    showGrid: true,
    showEdgeWeights: true,
    showNodeLabels: true,
};

export function VisualizerCanvas({
    step,
    algorithmType,
    visualizerKind = 'array',
    visualSettings = DEFAULT_SETTINGS,
}: VisualizerCanvasProps) {
    const mergedSettings = { ...DEFAULT_SETTINGS, ...visualSettings };

    if (!step) {
        return (
            <div
                id="visualizer-canvas"
                className="relative h-[320px] sm:h-[360px] lg:h-[420px] border border-slate-200 dark:border-slate-700/60 rounded-2xl bg-white/85 dark:bg-slate-950/70 flex items-center justify-center text-center overflow-hidden"
            >
                {mergedSettings.showGrid && <CanvasGrid />}
                <div className="relative z-10 space-y-2">
                    <p className="text-slate-600 dark:text-gray-300 font-semibold">Enter input and press <span className="text-slate-900 dark:text-white">Run</span> to start.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Use the settings button above to tweak the visualization before running.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            id="visualizer-canvas"
            className="relative w-full min-h-[320px] sm:min-h-[360px] lg:min-h-[420px] rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/85 dark:bg-slate-950/70 overflow-hidden"
        >
            {mergedSettings.showGrid && <CanvasGrid />}
            <div className="relative z-10 min-h-[360px]">
                {(visualizerKind === 'array' || step.array) && <ArrayVisualizer step={step} />}
                {visualizerKind === 'linked-list' && step.linkedList && <LinkedListVisualizer step={step} />}
                {visualizerKind === 'stack' && step.stack && <StackVisualizer step={step} />}
                {visualizerKind === 'queue' && step.queue && <QueueVisualizer step={step} />}
                {visualizerKind === 'tree' && step.tree && <TreeVisualizer step={step} />}
                {visualizerKind === 'heap' && step.heap && <HeapVisualizer step={step} />}
                {visualizerKind === 'hash-table' && step.hashTable && <HashTableVisualizer step={step} />}
                {visualizerKind === 'graph' && step.graph && (
                    <GraphVisualizer
                        step={step}
                        settings={mergedSettings}
                    />
                )}
            </div>
        </div>
    );
}

function CanvasGrid() {
    return (
        <div className="absolute inset-0 opacity-25 visualizer-grid" />
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
                    <div key={index} className="flex flex-col items-center gap-2 array-bar">
                        <div 
                            className={`w-full rounded-t-md border-2 transition-all duration-300 ${highlighted && type ? getHighlightColor(type) : 'bg-primary-200 dark:bg-primary-300 border-primary-400 dark:border-primary-500'}`}
                            style={{ height: `${heightPercent}%`, minHeight: '40px' }}
                            aria-label={`Value ${value} at index ${index}${highlighted ? ` - ${type}` : ''}`}
                            role="presentation"
                        />
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{value}</div>
                        {highlighted && type && <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{type}</div>}
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

interface GraphVisualizerProps {
    step: StepState;
    settings: VisualSettings;
}

function GraphVisualizer({ step, settings }: GraphVisualizerProps) {
    if (!step.graph) return null;
    const { nodes, edges } = step.graph;

    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 500;
    const PADDING = 48;

    const minX = Math.min(...nodes.map((node) => node.x));
    const maxX = Math.max(...nodes.map((node) => node.x));
    const minY = Math.min(...nodes.map((node) => node.y));
    const maxY = Math.max(...nodes.map((node) => node.y));

    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;

    const normalizedNodes = nodes.map((node) => ({
        ...node,
        x: PADDING + ((node.x - minX) / spanX) * (CANVAS_WIDTH - PADDING * 2),
        y: PADDING + ((node.y - minY) / spanY) * (CANVAS_HEIGHT - PADDING * 2),
    }));

    const nodeMap = new Map(normalizedNodes.map((node) => [node.id, node]));

    const getNodeColors = (highlight?: HighlightType) => {
        const palette: Record<string, { fill: string; stroke: string }> = {
            visiting: { fill: 'rgba(250, 204, 21, 0.9)', stroke: 'rgba(250, 204, 21, 1)' },
            visited: { fill: 'rgba(34, 197, 94, 0.9)', stroke: 'rgba(134, 239, 172, 1)' },
            current: { fill: 'rgba(249, 115, 22, 0.9)', stroke: 'rgba(251, 146, 60, 1)' },
            compare: { fill: 'rgba(192, 132, 252, 0.9)', stroke: 'rgba(233, 213, 255, 1)' },
            found: { fill: 'rgba(34, 197, 94, 0.9)', stroke: 'rgba(187, 247, 208, 1)' },
            path: { fill: 'rgba(168, 85, 247, 0.95)', stroke: 'rgba(233, 213, 255, 1)' },
            active: { fill: 'rgba(248, 113, 113, 0.95)', stroke: 'rgba(252, 165, 165, 1)' },
            swap: { fill: 'rgba(248, 113, 113, 0.85)', stroke: 'rgba(248, 113, 113, 1)' },
            pivot: { fill: 'rgba(236, 72, 153, 0.9)', stroke: 'rgba(244, 114, 182, 1)' },
            selected: { fill: 'rgba(129, 140, 248, 0.9)', stroke: 'rgba(165, 180, 252, 1)' },
            sorted: { fill: 'rgba(45, 212, 191, 0.9)', stroke: 'rgba(94, 234, 212, 1)' },
            low: { fill: 'rgba(59, 130, 246, 0.85)', stroke: 'rgba(147, 197, 253, 1)' },
            high: { fill: 'rgba(59, 130, 246, 0.85)', stroke: 'rgba(147, 197, 253, 1)' },
            mid: { fill: 'rgba(251, 146, 60, 0.85)', stroke: 'rgba(253, 186, 116, 1)' },
        };

        return palette[highlight || ''] || { fill: 'rgba(59, 130, 246, 0.85)', stroke: 'rgba(147, 197, 253, 1)' };
    };

    return (
        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[500px]">
            <svg
                className="absolute inset-0"
                width="100%"
                height="100%"
                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L6,3 z" fill="rgba(148,163,184,0.8)" />
                    </marker>
                    <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {edges.map((edge, idx) => {
                    const fromNode = nodeMap.get(edge.from);
                    const toNode = nodeMap.get(edge.to);
                    if (!fromNode || !toNode) return null;

                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;

                    return (
                        <g key={`${edge.from}-${edge.to}-${idx}`}> 
                            <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="rgba(148,163,184,0.5)"
                                strokeWidth={edge.highlight === 'path' ? 3 : 2}
                                markerEnd="url(#arrow)"
                            />
                            {settings.showEdgeWeights && edge.weight !== undefined && (
                                <text
                                    x={midX}
                                    y={midY - 6}
                                    textAnchor="middle"
                                    className="fill-purple-200 text-xs font-semibold"
                                >
                                    {edge.weight}
                                </text>
                            )}
                        </g>
                    );
                })}

                {normalizedNodes.map((node) => {
                    const colors = getNodeColors(node.highlight);

                    return (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            <circle
                                r={28}
                                stroke={colors.stroke}
                                fill={colors.fill}
                                strokeWidth={2}
                                filter={node.highlight ? 'url(#nodeGlow)' : undefined}
                            />
                            {settings.showNodeLabels && (
                                <text
                                    textAnchor="middle"
                                    dy="0.35em"
                                    className="fill-white font-semibold text-base"
                                >
                                    {node.label}
                                </text>
                            )}
                            {node.distance !== undefined && node.distance !== Infinity && (
                                <text
                                    textAnchor="middle"
                                    dy="2.2em"
                                    className="fill-slate-300 text-xs"
                                >
                                    d:{node.distance}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
