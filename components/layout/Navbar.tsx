import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="border-b bg-white sticky top-0 z-20 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-primary-600">
                        DSA Visualizer
                    </Link>
                    <div className="flex gap-6">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/visualizer"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                        >
                            Visualizer
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
