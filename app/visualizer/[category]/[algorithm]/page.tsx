'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { algorithms } from '@/lib/algorithms';
import { StepState } from '@/lib/algorithms/types';
import { parseInput } from '@/lib/utils/parseInput';
import { analytics } from '@/lib/utils/analytics';
import { exportCanvasAsImage, downloadJSON } from '@/lib/utils/export';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
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

export default function AlgorithmVisualizerPage({ params }: PageProps) {
    const { category, algorithm } = params;
    const prefersReducedMotion = useReducedMotion();

    // Get algorithm config
    const categoryAlgos = algorithms[category as keyof typeof algorithms];
    if (!categoryAlgos) {
        return <div>Category not found</div>;
    }

    const algoConfig = categoryAlgos[algorithm as keyof typeof categoryAlgos];
    if (!algoConfig) {
        return <div>Algorithm not found</div>;
    }

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
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const needsTarget = (algoConfig as any).inputType === 'array-target';

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

            if (config.visualizerKind === 'array') {
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
            setIsPlaying(false);
            setIsLoading(false);
            analytics.log('action', `Ran ${config.name}`, { steps: result.steps.length });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'An error occurred';
            setErrorMessage(msg);
            setIsLoading(false);
            analytics.log('error', msg, { algorithm: (algoConfig as any).name });
        }
        }, 50);
    }, [algoConfig, arrayInput, targetInput, operation, operationValue, needsTarget]);

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
        setSteps([]);
        setCurrentStepIndex(0);
        setErrorMessage('');
        setIsPlaying(false);
        setComparisons(0);
        setSwaps(0);
        analytics.log('action', 'Cleared inputs');
    }, []);

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

    return (
        <AppShell currentCategory={category} currentAlgorithm={algorithm}>
            <div className="max-w-[1800px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{config.name}</h1>
                        {config.module && (
                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded">
                                Module {config.module}
                            </span>
                        )}
                        {config.exerciseNumber && (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded">
                                Exercise {config.exerciseNumber}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{config.description}</p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
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
                            onRun={handleRun}
                            onRandomInput={handleRandomInput}
                            onClear={handleClear}
                        />

                        <VisualizerCanvas
                            step={currentStep}
                            algorithmType={config.type}
                            visualizerKind={config.visualizerKind}
                        />

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

                    {/* Right Column */}
                    <div className="space-y-6">
                        <CodePanel
                            code={config.code}
                            currentLine={currentStep?.lineNumber}
                        />

                        <ExplanationPanel
                            message={currentStep?.message || 'Click "Run" to start visualization'}
                        />

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
        </AppShell>
    );
}
