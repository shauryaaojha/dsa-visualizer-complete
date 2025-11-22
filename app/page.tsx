import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
    const modules = [
        {
            number: 1,
            title: 'Algorithms & Complexity',
            description: 'Master fundamental sorting and searching algorithms with complexity analysis',
            icon: '📊',
            color: 'from-blue-500 to-cyan-500',
            link: '/visualizer/sorting/bubble-sort',
            topics: ['Sorting Algorithms', 'Searching Algorithms', 'Time Complexity', 'Space Complexity'],
        },
        {
            number: 2,
            title: 'Arrays & Linked Lists',
            description: 'Understand linear data structures and their implementations',
            icon: '🔗',
            color: 'from-purple-500 to-pink-500',
            link: '/visualizer/linked-lists/singly-linked-list',
            topics: ['Singly Linked Lists', 'Doubly Linked Lists', 'Circular Lists', 'Array Operations'],
        },
        {
            number: 3,
            title: 'Stacks & Queues',
            description: 'Learn LIFO and FIFO structures with real-world applications',
            icon: '📚',
            color: 'from-green-500 to-teal-500',
            link: '/visualizer/stacks-queues/stack-array',
            topics: ['Stack Operations', 'Queue Operations', 'Circular Queue', 'Applications'],
        },
        {
            number: 4,
            title: 'Trees & BST',
            description: 'Explore hierarchical data structures and tree algorithms',
            icon: '🌳',
            color: 'from-orange-500 to-red-500',
            link: '/visualizer/trees/binary-search-tree',
            topics: ['Binary Trees', 'BST Operations', 'Tree Traversals', 'Balanced Trees'],
        },
        {
            number: 5,
            title: 'Graphs & Algorithms',
            description: 'Master graph representations and pathfinding algorithms',
            icon: '🕸️',
            color: 'from-indigo-500 to-purple-500',
            link: '/visualizer/graphs/dfs',
            topics: ['Graph Traversal', 'DFS & BFS', 'Shortest Path', 'Minimum Spanning Tree'],
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                            DSA Visualizer
                        </Link>
                        <div className="flex gap-6">
                            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/visualizer" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                                Visualizer
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                        DATA STRUCTURES AND ALGORITHMS - 21CSC201J
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Interactive Course
                        <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                            Visualizer
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Master Data Structures & Algorithms through interactive visualizations.
                        Complete coverage of all 5 course modules with step-by-step animations,
                        code highlighting, and detailed explanations.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/visualizer">
                            <Button size="lg" className="text-lg px-8 py-4">
                                Start Learning →
                            </Button>
                        </Link>
                        <Link href="/visualizer/sorting/bubble-sort">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                                Quick Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modules Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    Course Modules
                </h2>
                <p className="text-gray-600 mb-10 text-center">
                    Comprehensive coverage aligned with SRM University syllabus
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <Card key={module.number} className="p-6 hover:shadow-2xl transition-all duration-300 group">
                            <div className={`mb-4 w-16 h-16 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform`}>
                                {module.icon}
                            </div>
                            <div className="mb-2">
                                <span className="text-sm font-bold text-primary-600">MODULE {module.number}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm">{module.description}</p>

                            <div className="mb-4">
                                <div className="text-xs font-semibold text-gray-700 mb-2">Key Topics:</div>
                                <div className="flex flex-wrap gap-1">
                                    {module.topics.map((topic) => (
                                        <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link href={module.link}>
                                <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                                    Explore Module →
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Why Use This Visualizer?
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Step-by-Step</h3>
                        <p className="text-gray-600 text-sm">Watch algorithms execute one step at a time</p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Code Sync</h3>
                        <p className="text-gray-600 text-sm">See which line is executing in real-time</p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Variable Tracking</h3>
                        <p className="text-gray-600 text-sm">Monitor all variables and metrics</p>
                    </Card>

                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Course Aligned</h3>
                        <p className="text-gray-600 text-sm">Covers all exercise and lab practicals</p>
                    </Card>
                </div>
            </section>
        </main>
    );
}
