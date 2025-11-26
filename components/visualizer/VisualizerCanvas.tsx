"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface VisualizerCanvasProps {
    title?: string
    children: React.ReactNode
}

export function VisualizerCanvas({ title = "Visualization", children }: VisualizerCanvasProps) {
    return (
        <Card className="liquid-glass">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {children}
            </CardContent>
        </Card>
    )
}
