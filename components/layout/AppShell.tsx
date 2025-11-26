"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLandingPage = pathname === "/"

    return (
        <SidebarProvider defaultOpen={!isLandingPage}>
            <div className="flex min-h-screen w-full bg-background">
                {!isLandingPage && <Sidebar />}
                <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
                    <Navbar />
                    <main className={`flex-1 overflow-x-hidden ${isLandingPage ? 'pt-0' : 'pt-24 p-6'}`}>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
