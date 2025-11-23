import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "DSA Visualizer - Interactive Algorithm Learning",
    description: "Interactive Data Structures and Algorithms Visualizer with step-by-step animations",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={jetbrainsMono.variable}>
            <body className="antialiased font-sans text-base text-slate-900 dark:text-slate-100">
                {children}
            </body>
        </html>
    );
}
