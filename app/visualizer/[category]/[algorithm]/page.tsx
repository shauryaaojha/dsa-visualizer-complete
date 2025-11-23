'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { algorithms } from '@/lib/algorithms';
import { StepState } from '@/lib/algorithms/types';
import { parseInput } from '@/lib/utils/parseInput';
import { analytics } from '@/lib/utils/analytics';
import { exportCanvasAsImage, downloadJSON } from '@/lib/utils/export';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useTheme } from '@/lib/hooks/useTheme';
import { AppShell } from '@/components/layout/AppShell';
import { InputPanel } from '@/components/visualizer/InputPanel';
import { VisualizerCanvas } from '@/components/visualizer/VisualizerCanvas';
import { PlaybackControls } from '@/components/visualizer/PlaybackControls';
import { CodePanel } from '@/components/visualizer/CodePanel';
import { ExplanationPanel } from '@/components/visualizer/ExplanationPanel';
import { StateInspector } from '@/components/visualizer/StateInspector';

interface PageProps {
    params: {
        category: string;
        algorithm: string;
    };
}

interface VisualizerContentProps {
    category: string;
    algorithm: string;
    algoConfig: any;
}

export default function AlgorithmVisualizerPage({ params }: PageProps) {
    const { category, algorithm } = params;
    const categoryAlgos = algorithms[category as keyof typeof algorithms];

    if (!categoryAlgos) {
        return <div>Category not found</div>;
    }

    const algoConfig = categoryAlgos[algorithm as keyof typeof categoryAlgos];

    if (!algoConfig) {
        return <div>Algorithm not found</div>;
    }

    return <VisualizerContent category={category} algorithm={algorithm} algoConfig={algoConfig} />;
}

function VisualizerContent({ category, algorithm, algoConfig }: VisualizerContentProps) {
    const prefersReducedMotion = useReducedMotion();

    const [arrayInput, setArrayInput] = useState('10 3 5 1 8 2');
    const [targetInput, setTargetInput] = useState('5');
    const [operation, setOperation] = useState((algoConfig as any).operations?.[0] || '');
    const [operationValue, setOperationValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [steps, setSteps] = useState<StepState[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(prefersReducedMotion ? 0.5 : 1);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { theme, toggleTheme, mounted: themeMounted } = useTheme();
    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const settingsPopoverRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const initialSettings = {
        showGrid: true,
        showEdgeWeights: true,
        showNodeLabels: true,
        autoPlayAfterRun: false,
        showAnalyticsPanel: false,
    } as const;
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [visualSettings, setVisualSettings] = useState(initialSettings);
    const [activeMobileSection, setActiveMobileSection] = useState('visualization-panel');

    const needsTarget = (algoConfig as any).inputType === 'array-target';
    const hasCustomExpressionInput = (algoConfig as any).inputType === 'custom' && typeof (algoConfig as any).defaultInput === 'string';
    const [expressionInput, setExpressionInput] = useState(() => (
        hasCustomExpressionInput ? ((algoConfig as any).defaultInput as string) : ''
    ));

    useEffect(() => {
        if (hasCustomExpressionInput) {
            setExpressionInput(((algoConfig as any).defaultInput as string) || '');
        }
    }, [algoConfig, hasCustomExpressionInput]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleExport = useCallback(() => {
        exportCanvasAsImage('visualizer-canvas', `${algorithm}-visualization.png`);
        analytics.log('action', 'Exported visualization as image');
    }, [algorithm]);

    const handleExportSteps = useCallback(() => {
        downloadJSON(steps, `${algorithm}-steps.json`);
        analytics.log('action', 'Exported steps as JSON');
    }, [steps, algorithm]);

    const handleRun = useCallback(() => {
        setErrorMessage('');
        setIsLoading(true);
        
        // Use setTimeout to allow UI to update with loading state
        setTimeout(() => {
            try {
                let result;
                const config = algoConfig as any;

                if (hasCustomExpressionInput) {
                    const sanitizedExpression = expressionInput.trim();
                    result = config.execute(sanitizedExpression || (config.defaultInput as string));
                } else if (config.visualizerKind === 'array') {
                const array = parseInput(arrayInput);

                if (array.length === 0) {
                    setErrorMessage('Please enter at least one number');
                    analytics.log('error', 'Empty input array');
                    return;
                }

                if (needsTarget) {
                    const target = parseInt(targetInput);
                    if (isNaN(target)) {
                        setErrorMessage('Target must be a valid number');
                        analytics.log('error', 'Invalid target value');
                        return;
                    }
                    result = config.execute(array, target);
                } else {
                    result = config.execute(array);
                }
                } else if (config.visualizerKind === 'linked-list') {
                const value = operationValue ? parseInt(operationValue) : undefined;
                result = config.execute({ op: operation, value });
                } else if (config.visualizerKind === 'stack') {
                // Default stack operations
                result = config.execute(config.defaultInput);
                } else if (config.visualizerKind === 'tree') {
                const value = operationValue ? parseInt(operationValue) : 25;
                result = config.execute({ op: operation || 'insert', value });
                } else if (config.visualizerKind === 'graph') {
                result = config.execute(config.defaultInput);
                } else {
                // Try with default input
                result = config.execute(config.defaultInput);
                }

                setSteps(result.steps);
                setCurrentStepIndex(0);
                setComparisons(result.meta.comparisons);
                setSwaps(result.meta.swaps || 0);
                setIsPlaying(visualSettings.autoPlayAfterRun);
                setIsLoading(false);
                analytics.log('action', `Ran ${config.name}`, { steps: result.steps.length });
            } catch (error) {
                const msg = error instanceof Error ? error.message : 'An error occurred';
                setErrorMessage(msg);
                setIsLoading(false);
                analytics.log('error', msg, { algorithm: (algoConfig as any).name });
            }
        }, 50);
    }, [algoConfig, arrayInput, targetInput, operation, operationValue, needsTarget, visualSettings.autoPlayAfterRun, hasCustomExpressionInput, expressionInput]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleRandomInput = useCallback(() => {
        const size = 8 + Math.floor(Math.random() * 5);
        const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        setArrayInput(randomArray.join(' '));

        if (needsTarget) {
            const randomTarget = randomArray[Math.floor(Math.random() * randomArray.length)];
            setTargetInput(randomTarget.toString());
        }
        analytics.log('action', 'Generated random input');
    }, [needsTarget]);

    const handleClear = useCallback(() => {
        setArrayInput('');
        setTargetInput('');
        setOperationValue('');
        if (hasCustomExpressionInput) {
            setExpressionInput('');
        }
        setSteps([]);
        setCurrentStepIndex(0);
        setErrorMessage('');
        setIsPlaying(false);
        setComparisons(0);
        setSwaps(0);
        analytics.log('action', 'Cleared inputs');
    }, [hasCustomExpressionInput]);

    const handleReset = useCallback(() => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
        analytics.log('action', 'Reset visualization');
    }, []);

    const handlePrevious = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            analytics.log('step', 'Previous step', { step: currentStepIndex - 1 });
        }
    }, [currentStepIndex]);

    const handleNext = useCallback(() => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            analytics.log('step', 'Next step', { step: currentStepIndex + 1 });
        }
    }, [currentStepIndex, steps.length]);

    const handlePlayPause = useCallback(() => {
        if (steps.length === 0) return;

        if (currentStepIndex === steps.length - 1) {
            setCurrentStepIndex(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
        analytics.log('action', isPlaying ? 'Paused' : 'Playing');
    }, [steps.length, currentStepIndex, isPlaying]);

    // Auto-advance when playing
    useEffect(() => {
        if (!isPlaying || steps.length === 0) return;

        const duration = prefersReducedMotion ? 2000 : 1000 / speed;
        const interval = setInterval(() => {
            setCurrentStepIndex((prev) => {
                if (prev >= steps.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, duration);

        return () => clearInterval(interval);
    }, [isPlaying, speed, steps.length, prefersReducedMotion]);

    const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);

    // Track step changes
    useEffect(() => {
        if (steps.length > 0 && currentStep) {
            analytics.log('step', currentStep.message, { step: currentStepIndex });
        }
    }, [currentStepIndex, steps.length, currentStep]);

    const config = algoConfig as any;

    useEffect(() => {
        if (!settingsOpen) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (settingsPopoverRef.current?.contains(target)) return;
            if (settingsButtonRef.current?.contains(target)) return;
            setSettingsOpen(false);
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [settingsOpen]);

    const toggleSetting = (key: keyof typeof initialSettings) => {
        setVisualSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const mobileNavItems = [
        { id: 'visualization-panel', label: 'Visual', icon: '👁️' },
        { id: 'controls-panel', label: 'Controls', icon: '🎛️' },
        { id: 'input-panel', label: 'Input', icon: '⚙️' },
        { id: 'step-panel', label: 'Steps', icon: '💡' },
        { id: 'state-panel', label: 'State', icon: '📊' },
    ];

    const handleMobileNav = (targetId: string) => {
        setActiveMobileSection(targetId);
        if (typeof document === 'undefined') return;
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <AppShell currentCategory={category} currentAlgorithm={algorithm}>
            {/* FinDost-style background with animated gradient orbs */}
            <div className="min-h-screen bg-[#02030a] relative overflow-visible md:overflow-hidden transition-colors pb-20 md:pb-12">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-gradient-radial from-[#1d4ed8]/25 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-[-20%] left-[-5%] w-[900px] h-[900px] bg-gradient-radial from-[#7c3aed]/25 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slower"></div>
                    <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-radial from-[#22d3ee]/20 via-transparent to-transparent rounded-full blur-2xl animate-float"></div>
                </div>

                <div className="relative z-10 max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 pb-8">
                    {/* Compact Header */}
                    <div className="mb-4 bg-gradient-to-r from-[#0f172a] via-[#1f0f3c] to-[#05040b] border border-white/10 rounded-3xl p-5 md:p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3 flex-wrap flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    {config.name}
                                </h1>
                                {config.module && (
                                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/15">
                                        Module {config.module}
                                    </span>
                                )}
                                {config.exerciseNumber && (
                                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/15">
                                        Ex {config.exerciseNumber}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 relative justify-start sm:justify-end overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
                                <button
                                    onClick={() => {
                                        const elem = document.documentElement;
                                        if (!document.fullscreenElement) {
                                            elem.requestFullscreen?.();
                                        } else {
                                            document.exitFullscreen?.();
                                        }
                                    }}
                                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium transition-colors"
                                    title="Toggle Fullscreen"
                                >
                                    ⛶
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium transition-colors"
                                    title="Export Visualization"
                                >
                                    📸
                                </button>
                                <button
                                    onClick={handleExportSteps}
                                    className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-white text-sm font-medium transition-colors"
                                    title="Download Step JSON"
                                >
                                    🧾
                                </button>
                                <button
                                    onClick={() => alert('Keyboard Shortcuts:\n\nSpace/K - Play/Pause\nJ/← - Previous Step\nL/→ - Next Step\nR - Reset\nF - Fullscreen')}
                                    className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-white text-sm font-medium transition-colors"
                                    title="Keyboard Shortcuts"
                                >
                                    ⌨️
                                </button>
                                <button
                                    ref={settingsButtonRef}
                                    onClick={() => setSettingsOpen((prev) => !prev)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${settingsOpen ? 'bg-[#238636] text-white border-[#238636]' : 'bg-[#21262d] text-white border-[#30363d] hover:bg-[#30363d]'}`}
                                    title="Visualizer Settings"
                                >
                                    ⚙️
                                </button>

                            </div>
                        </div>
                        <p className="text-sm text-white/70 max-w-2xl mt-2">{config.description}</p>
                    </div>

                    {visualSettings.showAnalyticsPanel && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                            {[
                                { label: 'Steps', value: steps.length },
                                { label: 'Comparisons', value: comparisons },
                                { label: 'Swaps / Mutations', value: swaps },
                                { label: 'Playback Speed', value: `${speed.toFixed(2)}x` },
                            ].map((metric) => (
                                <div key={metric.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">{metric.label}</p>
                                    <p className="text-xl font-bold text-white">{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Main Split Layout */}
                    <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,450px]">
                        {/* LEFT: Visualization Area */}
                        <div className="space-y-4 order-2 lg:order-1">
                            {/* Main Visualization Canvas */}
                            <div id="visualization-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl overflow-hidden scroll-mt-20">
                                <div className="p-4 border-b border-[#30363d] bg-[#0d1117]">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="text-2xl">👁️</span>
                                        Visualization
                                    </h2>
                                </div>
                                <div className="p-4 sm:p-6 min-h-[320px] sm:min-h-[400px] lg:min-h-[500px]"  >
                                    <VisualizerCanvas
                                        step={currentStep}
                                        algorithmType={config.type}
                                        visualizerKind={config.visualizerKind}
                                        visualSettings={{
                                            showGrid: visualSettings.showGrid,
                                            showEdgeWeights: visualSettings.showEdgeWeights,
                                            showNodeLabels: visualSettings.showNodeLabels,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Playback Controls */}
                            <div id="controls-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl p-5 scroll-mt-20">
                                <PlaybackControls
                                    currentStep={currentStepIndex}
                                    totalSteps={steps.length}
                                    isPlaying={isPlaying}
                                    speed={speed}
                                    onReset={handleReset}
                                    onPrevious={handlePrevious}
                                    onPlayPause={handlePlayPause}
                                    onNext={handleNext}
                                    onSpeedChange={setSpeed}
                                />
                            </div>

                            {/* Code Panel */}
                            <div id="code-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl overflow-hidden scroll-mt-20">
                                <div className="p-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="text-2xl">💻</span>
                                        Code
                                    </h2>
                                    {currentStep?.lineNumber && (
                                        <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                                            Line {currentStep.lineNumber}
                                        </span>
                                    )}
                                </div>
                                <CodePanel
                                    code={config.code}
                                    currentLine={currentStep?.lineNumber}
                                />
                            </div>
                        </div>

                        {/* RIGHT: Sidebar with Input & State */}
                        <div className="space-y-4 order-1 lg:order-2">
                            {/* Input Panel */}
                            <div id="input-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl p-5 lg:sticky lg:top-4 scroll-mt-24">
                                <div className="mb-4 pb-3 border-b border-[#30363d]">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="text-2xl">⚙️</span>
                                        Input
                                    </h2>
                                </div>
                                <InputPanel
                                    visualizerKind={config.visualizerKind}
                                    arrayInput={arrayInput}
                                    targetInput={targetInput}
                                    operation={operation}
                                    operationValue={operationValue}
                                    needsTarget={needsTarget}
                                    errorMessage={errorMessage}
                                    operations={config.operations}
                                    isLoading={isLoading}
                                    onArrayInputChange={setArrayInput}
                                    onTargetInputChange={setTargetInput}
                                    onOperationChange={setOperation}
                                    onOperationValueChange={setOperationValue}
                                    customInputLabel={hasCustomExpressionInput ? 'Infix Expression' : undefined}
                                    customInputPlaceholder={hasCustomExpressionInput ? 'e.g., (A+B)*C-D^E' : undefined}
                                    customInputHelperText={hasCustomExpressionInput ? 'Operands can be letters or digits. Include parentheses for intended precedence.' : undefined}
                                    customInputValue={hasCustomExpressionInput ? expressionInput : undefined}
                                    onCustomInputChange={hasCustomExpressionInput ? setExpressionInput : undefined}
                                    onRun={handleRun}
                                    onRandomInput={handleRandomInput}
                                    onClear={handleClear}
                                />
                            </div>

                            {/* Explanation Panel */}
                            <div id="step-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl p-5 scroll-mt-24">
                                <div className="mb-3 pb-2 border-b border-[#30363d]">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="text-2xl">💡</span>
                                        Current Step
                                    </h2>
                                </div>
                                <ExplanationPanel
                                    message={currentStep?.message || 'Click "Run" to start visualization'}
                                />
                            </div>

                            {/* State Inspector */}
                            <div id="state-panel" className="bg-[#050712]/80 border border-white/10 rounded-3xl p-5 scroll-mt-24">
                                <div className="mb-3 pb-2 border-b border-[#30363d]">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <span className="text-2xl">📊</span>
                                        State Inspector
                                    </h2>
                                </div>
                                <StateInspector
                                    variables={currentStep?.variables || {}}
                                    comparisons={comparisons}
                                    swaps={swaps}
                                    currentStep={currentStepIndex}
                                    totalSteps={steps.length}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isClient && !settingsOpen && (
                <div className="fixed bottom-4 inset-x-0 px-4 z-40 md:hidden pointer-events-none">
                    <div className="bg-[#050712]/95 border border-white/10 rounded-2xl flex items-center justify-between px-3 py-2 gap-1.5 pointer-events-auto shadow-2xl">
                        {mobileNavItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleMobileNav(item.id)}
                                className={`flex-1 flex flex-col items-center text-[11px] font-medium transition-colors py-1 px-1 rounded-lg ${activeMobileSection === item.id
                                        ? 'text-[#58a6ff] bg-[#0d1117]'
                                        : 'text-[#7d8590] hover:text-white'
                                    }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="mt-0.5">{item.label}</span>
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setSettingsOpen(true)}
                            className="px-3 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold shadow-lg transition-colors"
                        >
                            Settings
                        </button>
                    </div>
                </div>
            )}
            {isClient && settingsOpen && createPortal(
                <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 sm:pt-28">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSettingsOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        ref={settingsPopoverRef}
                        className="relative w-full max-w-md bg-[#050712] border border-white/10 rounded-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-base font-semibold text-white">Visualizer Settings</p>
                            <button
                                onClick={() => setSettingsOpen(false)}
                                className="text-sm text-[#7d8590] hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        {themeMounted && (
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-white">Theme</p>
                                    <p className="text-xs text-[#7d8590]">Switch between light and dark mode</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white text-xs font-medium"
                                >
                                    {theme === 'dark' ? 'Use Light' : 'Use Dark'}
                                </button>
                            </div>
                        )}

                        {[
                            {
                                key: 'showGrid',
                                label: 'Grid Overlay',
                                description: 'Helps gauge spacing between nodes',
                            },
                            {
                                key: 'showEdgeWeights',
                                label: 'Edge Weights',
                                description: 'Render weights/metadata on graph edges',
                            },
                            {
                                key: 'showNodeLabels',
                                label: 'Node Labels',
                                description: 'Show node identifiers and distances',
                            },
                            {
                                key: 'autoPlayAfterRun',
                                label: 'Auto-play after Run',
                                description: 'Jump straight into playback once data is ready',
                            },
                            {
                                key: 'showAnalyticsPanel',
                                label: 'Show Analytics Row',
                                description: 'Pin quick stats below the hero section',
                            },
                        ].map((setting) => {
                            const isEnabled = visualSettings[setting.key as keyof typeof initialSettings];
                            return (
                                <div key={setting.key} className="space-y-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-white">{setting.label}</p>
                                            <p className="text-xs text-[#7d8590]">{setting.description}</p>
                                        </div>
                                        {isEnabled ? (
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked="true"
                                                aria-label={`Toggle ${setting.label}`}
                                                onClick={() => toggleSetting(setting.key as keyof typeof initialSettings)}
                                                className="w-12 h-6 rounded-full transition-colors flex items-center px-1 bg-[#238636]"
                                            >
                                                <span className="h-4 w-4 rounded-full bg-white shadow transform transition-transform translate-x-5"></span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked="false"
                                                aria-label={`Toggle ${setting.label}`}
                                                onClick={() => toggleSetting(setting.key as keyof typeof initialSettings)}
                                                className="w-12 h-6 rounded-full transition-colors flex items-center px-1 bg-[#21262d] border border-[#30363d]"
                                            >
                                                <span className="h-4 w-4 rounded-full bg-white shadow transform transition-transform translate-x-0"></span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>,
                document.body
            )}
        </AppShell>
    );
}
