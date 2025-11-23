import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { moduleStructure } from '@/components/layout/moduleStructure';
import { algorithms } from '@/lib/algorithms';

const enhancedModules = moduleStructure.map((module, index) => {
    const categories = module.categories.map((category) => {
        const categoryAlgos = algorithms[category as keyof typeof algorithms];
        const entries = categoryAlgos ? Object.entries(categoryAlgos) : [];
        return {
            key: category,
            label: category.replace(/-/g, ' '),
            count: entries.length,
            entries: entries.map(([slug, config]) => ({
                slug,
                name: (config as { name: string }).name,
            })),
        };
    });

    return {
        ...module,
        accent: index % 2 === 0 ? 'from-[#2563eb] to-[#3b82f6]' : 'from-[#7c3aed] to-[#c026d3]',
        glow: index % 2 === 0 ? 'from-[#2563eb]/15 to-[#22d3ee]/5' : 'from-[#c026d3]/20 to-[#fb7185]/5',
        total: categories.reduce((sum, item) => sum + item.count, 0),
        categories,
    };
});

const totalAlgorithms = enhancedModules.reduce((sum, module) => sum + module.total, 0);

export default function CurriculumPage() {
    return (
        <div className="min-h-screen bg-[#02030a] text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-15%] left-1/4 w-[800px] h-[800px] bg-gradient-radial from-[#1d4ed8]/30 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-0 w-[900px] h-[900px] bg-gradient-radial from-[#9333ea]/25 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090315]/40 to-[#020205]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                <main className="px-4 sm:px-6 lg:px-8 py-10">
                    <div className="max-w-6xl mx-auto space-y-10">
                        <section className="rounded-[32px] bg-gradient-to-br from-[#160c30] via-[#271048] to-[#05040b] border border-white/10 p-8 sm:p-12 shadow-[0_40px_120px_rgba(20,12,48,0.55)]">
                            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
                                <div className="space-y-6">
                                    <p className="text-xs uppercase tracking-[0.5em] text-white/50">Curriculum</p>
                                    <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">Structured DSA roadmap you can fork and follow.</h1>
                                    <p className="text-white/70 text-lg">
                                        Each module bundles walkthrough-friendly visualizers, practice prompts, and notes. Work through them linearly or jump to the concept you need—everything stays open-source and remixable.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Algorithms</p>
                                            <p className="text-2xl font-semibold">{totalAlgorithms}</p>
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Modules</p>
                                            <p className="text-2xl font-semibold">{enhancedModules.length}</p>
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5">
                                            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Fully open</p>
                                            <p className="text-2xl font-semibold">OSS-first</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <Link href="/visualizer">
                                            <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-[#04170b] px-8 py-4 text-lg font-semibold rounded-full shadow-[0_25px_70px_rgba(34,197,94,0.35)]">
                                                Launch visualizer
                                            </Button>
                                        </Link>
                                        <Link href="/" className="text-white/70 hover:text-white font-semibold inline-flex items-center gap-2">
                                            Back to overview →
                                        </Link>
                                    </div>
                                </div>
                                <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-4">
                                    <p className="text-xs uppercase tracking-[0.4em] text-white/40">Why this track?</p>
                                    <ul className="space-y-3 text-sm text-white/70">
                                        <li>• Mirrors classic university pacing without the lock-in.</li>
                                        <li>• Every step uses the same FinDost-inspired visual language.</li>
                                        <li>• Designed for contribution—swap modules or add drills via PRs.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Module collection</p>
                                <h2 className="text-3xl font-semibold">Explore the roadmap</h2>
                            </div>
                            <div className="grid gap-6">
                                {enhancedModules.map((module) => (
                                    <div key={module.module} className="rounded-[28px] border border-white/10 bg-[#05050c]/80 p-6 sm:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.35)]">
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="space-y-2">
                                                <p className="text-xs uppercase tracking-[0.4em] text-white/40">{module.module}</p>
                                                <h3 className="text-2xl font-semibold">{module.title}</h3>
                                                <p className="text-sm text-white/60">{module.total} visualizers · {module.categories.length} topic tracks</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${module.accent} text-white`}>Built for mastery</div>
                                        </div>

                                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                            {module.categories.map((category) => (
                                                <div key={category.key} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-semibold text-white">{category.label}</p>
                                                        <span className="text-xs text-white/60">{category.count} visualizers</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                                        {category.entries.slice(0, 3).map((algo) => (
                                                            <span key={algo.slug} className="px-3 py-1 rounded-full bg-white/10 border border-white/15">{algo.name}</span>
                                                        ))}
                                                        {category.entries.length > 3 && (
                                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">+{category.entries.length - 3} more</span>
                                                        )}
                                                    </div>
                                                    {category.entries[0] && (
                                                        <Link href={`/visualizer/${category.key}/${category.entries[0].slug}`} className="inline-flex text-sm text-emerald-300 hover:text-emerald-200 font-semibold">
                                                            Jump to first visualizer →
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
