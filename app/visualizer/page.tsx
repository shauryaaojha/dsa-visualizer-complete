import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { algorithms, getAllAlgorithms } from '@/lib/algorithms';

export default function VisualizerPage() {
    const allAlgos = getAllAlgorithms();

    // Group by modules
    const moduleGroups = [
        { module: 1, title: 'Module 1: Algorithms & Complexity', categories: ['sorting', 'searching'] },
        { module: 2, title: 'Module 2: Arrays & Linked Lists', categories: ['linked-lists'] },
        { module: 3, title: 'Module 3: Stacks & Queues', categories: ['stacks-queues'] },
        { module: 4, title: 'Module 4: Trees & BST', categories: ['trees'] },
        { module: 5, title: 'Module 5: Graph Algorithms', categories: ['graphs'] },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="border-b bg-white sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-2xl font-bold text-primary-600">
                            DSA Visualizer
                        </Link>
                        <div className="flex gap-6">
                            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                                Home
                            </Link>
                            <Link href="/visualizer" className="text-gray-700 hover:text-primary-600 font-medium">
                                Visualizer
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Visualizers</h1>
                    <p className="text-gray-600">
                        Complete coverage of DATA STRUCTURES AND ALGORITHMS (21CSC201J) organized by modules
                    </p>
                </div>

                <div className="space-y-12">
                    {moduleGroups.map((group) => (
                        <div key={group.module}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">
                                    M{group.module}
                                </span>
                                {group.title}
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.categories.map((category) => {
                                    const categoryAlgos = algorithms[category as keyof typeof algorithms];
                                    if (!categoryAlgos) return null;

                                    return Object.keys(categoryAlgos).map((algoKey) => {
                                        const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos];

                                        return (
                                            <Card key={algoKey} className="p-6 hover:shadow-xl transition-all group">
                                                <div className="mb-3">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                        {algo.name}
                                                    </h3>
                                                    {algo.exerciseNumber && (
                                                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                                                            Exercise {algo.exerciseNumber}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {algo.description}
                                                </p>

                                                <div className="mb-4">
                                                    <div className="text-xs font-semibold text-gray-700 mb-1">Type:</div>
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                        {algo.visualizerKind}
                                                    </span>
                                                </div>

                                                {algo.operations && (
                                                    <div className="mb-4">
                                                        <div className="text-xs font-semibold text-gray-700 mb-1">Operations:</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {algo.operations.slice(0, 3).map((op) => (
                                                                <span key={op} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                                                    {op}
                                                                </span>
                                                            ))}
                                                            {algo.operations.length > 3 && (
                                                                <span className="text-xs text-gray-500">+{algo.operations.length - 3} more</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <Link href={`/visualizer/${category}/${algoKey}`}>
                                                    <Button className="w-full group-hover:bg-primary-700 transition-colors">
                                                        Visualize →
                                                    </Button>
                                                </Link>
                                            </Card>
                                        );
                                    });
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
