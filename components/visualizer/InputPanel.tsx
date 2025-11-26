"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface InputPanelProps {
    title?: string
    children: React.ReactNode
}

export function InputPanel({ title = "Operations", children }: InputPanelProps) {
    return (
        <Card className="liquid-glass">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {children}
            </CardContent>
        </Card>
    )
}
