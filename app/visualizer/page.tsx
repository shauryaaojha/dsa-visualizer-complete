import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import { algorithms, getAllAlgorithms } from '@/lib/algorithms';

export default function VisualizerPage() {
    const allAlgos = getAllAlgorithms();

    // Group by modules with icons and gradients
    const moduleGroups = [
        { 
            module: 1, 
            title: 'Algorithms & Complexity', 
            categories: ['sorting', 'searching'],
            icon: '⚡',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-500/10 to-cyan-500/10'
        },
        { 
            module: 2, 
            title: 'Arrays & Linked Lists', 
            categories: ['linked-lists'],
            icon: '🔗',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-500/10 to-pink-500/10'
        },
        { 
            module: 3, 
            title: 'Stacks & Queues', 
            categories: ['stacks-queues'],
            icon: '📚',
            gradient: 'from-green-500 to-teal-500',
            bgGradient: 'from-green-500/10 to-teal-500/10'
        },
        { 
            module: 4, 
            title: 'Trees & BST', 
            categories: ['trees'],
            icon: '🌳',
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-500/10 to-red-500/10'
        },
        { 
            module: 5, 
            title: 'Graph Algorithms', 
            categories: ['graphs'],
            icon: '🕸️',
            gradient: 'from-indigo-500 to-purple-500',
            bgGradient: 'from-indigo-500/10 to-purple-500/10'
        },
    ];

    return (
        <div className="min-h-screen bg-[#02030a] text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] bg-gradient-radial from-[#1d4ed8]/25 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-0 w-[900px] h-[900px] bg-gradient-radial from-[#7c3aed]/25 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090315]/40 to-[#020205]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                <main className="px-4 sm:px-6 lg:px-8 py-10">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <section className="rounded-[32px] bg-gradient-to-br from-[#180c33] via-[#2a1155] to-[#05040b] border border-white/10 p-8 sm:p-12 shadow-[0_40px_120px_rgba(20,12,48,0.55)]">
                            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div className="space-y-4 max-w-2xl">
                                    <p className="text-xs uppercase tracking-[0.5em] text-white/50">Course visualizers</p>
                                    <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
                                        Complete DSA coverage, module by module.
                                    </h1>
                                    <p className="text-white/70 text-lg">
                                        Every walkthrough, note, and instrumented run is open-source. Pick a module, replay any algorithm, and tweak the code directly inside the visualizer.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Algorithms</p>
                                            <p className="text-2xl font-semibold">{allAlgos.length}</p>
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Modules</p>
                                            <p className="text-2xl font-semibold">5</p>
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Deploy type</p>
                                            <p className="text-2xl font-semibold">100% OSS</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-3 w-full max-w-sm">
                                    <p className="text-xs uppercase tracking-[0.4em] text-white/40">Need a jump point?</p>
                                    <div className="space-y-2">
                                        <Link href="/visualizer/sorting/bubble-sort" className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/80 hover:text-white">
                                            Sorting • Bubble Sort
                                        </Link>
                                        <Link href="/visualizer/graphs/bfs" className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/80 hover:text-white">
                                            Graphs • BFS Explorer
                                        </Link>
                                        <Link href="/visualizer/linked-lists/singly-linked-list" className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/80 hover:text-white">
                                            Linked Lists • Core ops
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-12">
                            {moduleGroups.map((group) => (
                                <div key={group.module} className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.bgGradient} border border-white/10 flex items-center justify-center text-2xl`}>
                                            {group.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Module {group.module}</p>
                                            <h2 className="text-3xl font-semibold">{group.title}</h2>
                                            <p className="text-sm text-white/60">Fork-friendly drills covering {group.categories.length > 1 ? 'paired topics' : 'focused topics'}.</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        {group.categories.map((category) => {
                                            const categoryAlgos = algorithms[category as keyof typeof algorithms];
                                            if (!categoryAlgos) return null;

                                            return Object.keys(categoryAlgos).map((algoKey) => {
                                                const algo = categoryAlgos[algoKey as keyof typeof categoryAlgos] as any;

                                                return (
                                                    <div key={algoKey} className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-col gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)] hover:border-white/30 transition-colors">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <p className="text-sm font-semibold text-white">{algo.name}</p>
                                                                <p className="text-xs text-white/60 mt-1">{algo.description}</p>
                                                            </div>
                                                            {algo.exerciseNumber && (
                                                                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15 text-white/70">
                                                                    Ex {algo.exerciseNumber}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 text-xs text-white/60">
                                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{algo.visualizerKind}</span>
                                                            {(algo.operations || []).slice(0, 2).map((op: string) => (
                                                                <span key={op} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{op}</span>
                                                            ))}
                                                            {algo.operations && algo.operations.length > 2 && (
                                                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">+{algo.operations.length - 2}</span>
                                                            )}
                                                        </div>

                                                        <Link href={`/visualizer/${category}/${algoKey}`}>
                                                            <Button className={`w-full bg-gradient-to-r ${group.gradient} text-white font-semibold rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:opacity-95`}>
                                                                Visualize →
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                );
                                            });
                                        })}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
