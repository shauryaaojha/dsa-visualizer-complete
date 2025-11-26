"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface StateInspectorProps {
    data: {
        variables?: Record<string, any>
        comparisons?: number
        swaps?: number
        totalSteps?: number
        currentStepDescription?: string
        [key: string]: any
    }
}

export function StateInspector({ data }: StateInspectorProps) {
    return (
        <div className="space-y-4">
            <Card className="liquid-glass border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">State Inspector</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.variables && (
                        <div>
                            <h4 className="text-sm font-bold mb-3 text-primary">Variables</h4>
                            <div className="space-y-2 text-sm">
                                {Object.entries(data.variables).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-secondary/30 border border-primary/10">
                                        <span className="text-muted-foreground font-medium">{key}:</span>
                                        <span className="font-mono font-bold text-primary">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/10">
                        {data.comparisons !== undefined && (
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="text-xs text-muted-foreground font-semibold mb-1">Comparisons</div>
                                <div className="text-2xl font-black text-primary">{data.comparisons}</div>
                            </div>
                        )}
                        {data.swaps !== undefined && (
                            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                                <div className="text-xs text-muted-foreground font-semibold mb-1">Swaps</div>
                                <div className="text-2xl font-black text-accent">{data.swaps}</div>
                            </div>
                        )}
                        {data.totalSteps !== undefined && (
                            <div className="p-3 rounded-xl bg-secondary/30 border border-primary/10 col-span-2">
                                <div className="text-xs text-muted-foreground font-semibold mb-1">Total Steps</div>
                                <div className="text-2xl font-black text-foreground">{data.totalSteps}</div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
