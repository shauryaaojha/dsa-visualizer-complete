'use client';

import { useState, useEffect } from 'react';
import { algorithms } from '@/lib/algorithms';
import { StepState } from '@/lib/algorithms/types';
import { parseInput } from '@/lib/utils/parseInput';
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
    const [operation, setOperation] = useState(algoConfig.operations?.[0] || '');
    const [operationValue, setOperationValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [steps, setSteps] = useState<StepState[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);

    const needsTarget = algoConfig.inputType === 'array-target';

    const handleRun = () => {
        setErrorMessage('');
        try {
            let result;

            if (algoConfig.visualizerKind === 'array') {
                const array = parseInput(arrayInput);

                if (array.length === 0) {
                    setErrorMessage('Please enter at least one number');
                    return;
                }

                if (needsTarget) {
                    const target = parseInt(targetInput);
                    if (isNaN(target)) {
                        setErrorMessage('Target must be a valid number');
                        return;
                    }
                    result = algoConfig.execute(array, target);
                } else {
                    result = algoConfig.execute(array);
                }
            } else if (algoConfig.visualizerKind === 'linked-list') {
                const value = operationValue ? parseInt(operationValue) : undefined;
                result = algoConfig.execute({ op: operation, value });
            } else if (algoConfig.visualizerKind === 'stack') {
                // Default stack operations
                result = algoConfig.execute(algoConfig.defaultInput);
            } else if (algoConfig.visualizerKind === 'tree') {
                const value = operationValue ? parseInt(operationValue) : 25;
                result = algoConfig.execute({ op: operation || 'insert', value });
            } else if (algoConfig.visualizerKind === 'graph') {
                result = algoConfig.execute(algoConfig.defaultInput);
            } else {
                // Try with default input
                result = algoConfig.execute(algoConfig.defaultInput);
            }

            setSteps(result.steps);
            setCurrentStepIndex(0);
            setComparisons(result.meta.comparisons);
            setSwaps(result.meta.swaps || 0);
            setIsPlaying(false);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleRandomInput = () => {
        const size = 8 + Math.floor(Math.random() * 5);
        const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        setArrayInput(randomArray.join(' '));

        if (needsTarget) {
            const randomTarget = randomArray[Math.floor(Math.random() * randomArray.length)];
            setTargetInput(randomTarget.toString());
        }
    };

    const handleClear = () => {
        setArrayInput('');
        setTargetInput('');
        setOperationValue('');
        setSteps([]);
        setCurrentStepIndex(0);
        setErrorMessage('');
        setIsPlaying(false);
        setComparisons(0);
        setSwaps(0);
    };

    const handleReset = () => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handlePlayPause = () => {
        if (steps.length === 0) return;

        if (currentStepIndex === steps.length - 1) {
            setCurrentStepIndex(0);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    // Auto-advance when playing
    useEffect(() => {
        if (!isPlaying || steps.length === 0) return;

        const interval = setInterval(() => {
            setCurrentStepIndex((prev) => {
                if (prev >= steps.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000 / speed);

        return () => clearInterval(interval);
    }, [isPlaying, speed, steps.length]);

    const currentStep = steps[currentStepIndex];

    return (
        <AppShell currentCategory={category} currentAlgorithm={algorithm}>
            <div className="max-w-[1800px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{algoConfig.name}</h1>
                        {algoConfig.module && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded">
                                Module {algoConfig.module}
                            </span>
                        )}
                        {algoConfig.exerciseNumber && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                Exercise {algoConfig.exerciseNumber}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600">{algoConfig.description}</p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <InputPanel
                            visualizerKind={algoConfig.visualizerKind}
                            arrayInput={arrayInput}
                            targetInput={targetInput}
                            operation={operation}
                            operationValue={operationValue}
                            needsTarget={needsTarget}
                            errorMessage={errorMessage}
                            operations={algoConfig.operations}
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
                            algorithmType={algoConfig.type}
                            visualizerKind={algoConfig.visualizerKind}
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
                            code={algoConfig.code}
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
