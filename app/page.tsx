import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';

const heroChips = ['No login wall', 'Step-by-step drills', 'Copy-ready code', '100% open source'];

const labStats = [
    { label: 'Launch-ready visualizers', value: '12 labs', helper: 'Tweak and replay every step' },
    { label: 'Roadmap modules', value: '9 packs', helper: 'From arrays to advanced graphs' },
    { label: 'Community PRs', value: '140+', helper: 'Kept fresh by contributors' },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[#02030a] text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] bg-gradient-radial from-[#1d4ed8]/30 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-0 w-[900px] h-[900px] bg-gradient-radial from-[#7c3aed]/25 via-transparent to-transparent blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090315]/40 to-[#020205]"></div>
            </div>

            <div className="relative z-10">
                <Navbar showAlgorithmMenu={false} />

                <main className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <section className="space-y-6">
                            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1f0f3c] to-[#05040b] border border-white/10 shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
                                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.6em] text-white/45">
                                            <div className="w-8 h-8 rounded-2xl bg-[#1d4ed8]/40 flex items-center justify-center text-lg">⚡</div>
                                            Open-source DSA guide
                                        </div>
                                        <div className="space-y-3">
                                            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">Build algorithms intuition with transparent, visual drills.</h1>
                                            <p className="text-base text-white/70">Everything lives in this repo—no profiles, no gated dashboards. Fork it, remix it, and run the labs locally or right inside the visualizer.</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {heroChips.map((chip) => (
                                                <span key={chip} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-white/60">{chip}</span>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link href="/visualizer">
                                                <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-[#04170b] px-8 py-4 text-lg font-semibold rounded-full shadow-[0_25px_70px_rgba(34,197,94,0.35)]">
                                                    Launch visualizer
                                                </Button>
                                            </Link>
                                            <Link href="/curriculum" className="text-white/70 hover:text-white font-semibold inline-flex items-center justify-center gap-2">
                                                Explore roadmap →
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {labStats.map((card) => (
                                            <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-xs uppercase tracking-[0.4em] text-white/40">{card.label}</p>
                                                <p className="text-2xl font-semibold mt-2">{card.value}</p>
                                                <p className="text-xs text-white/70 mt-1">{card.helper}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                            <p className="text-white/70 text-lg mb-4">Ready to dive into interactive algorithm visualizations?</p>
                            <Link href="/visualizer/sorting/bubble-sort" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-semibold text-xl">
                                Start with Bubble Sort →
                            </Link>
                        </section>

                        <section id="modules" className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold">Curriculum at a glance</h3>
                                    <p className="text-white/70">Structured roadmap for every module</p>
                                </div>
                                <Link href="/curriculum" className="hidden sm:inline-flex px-4 py-2 rounded-full border border-white/15 text-sm text-white/80 hover:bg-white/5">
                                    See all modules
                                </Link>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {['Sorting Systems', 'Tree Intelligence', 'Graph Lab', 'Memory Playgrounds'].map((module, index) => (
                                    <div key={module} className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                                        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Module {index + 1}</p>
                                        <h4 className="text-xl font-semibold">{module}</h4>
                                        <p className="text-sm text-white/70">Dive into curated exercises, visual walkthroughs, and smart practice sets.</p>
                                        <div className="flex flex-wrap gap-2 text-xs text-white/70">
                                            {['Practice', 'Visualizer', 'Notes'].map((chip) => (
                                                <span key={chip} className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{chip}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-white/5 text-center text-white/50 space-x-1">
                    <span>Built with ♡ for DSA learners • by</span>
                    <Link
                        href="https://github.com/shauryaaojha"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-emerald-300 font-semibold"
                    >
                        @shauryaaojha
                    </Link>
                    <span>&amp;</span>
                    <Link
                        href="https://github.com/ranjan-arnav"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-emerald-300 font-semibold"
                    >
                        @ranjan-arnav
                    </Link>
                </footer>
            </div>
        </div>
    );
}
