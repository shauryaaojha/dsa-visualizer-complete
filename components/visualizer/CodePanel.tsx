"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Code2 } from "lucide-react"

interface CodeDisplayProps {
  code: string
  highlightedLine?: number
  language?: string
}

export function CodeDisplay({ code, highlightedLine, language = "typescript" }: CodeDisplayProps) {
  const lines = useMemo(() => code.split("\n"), [code])

  return (
    <Card className="liquid-glass">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-bold">Code</CardTitle>
          {language && (
            <span className="ml-auto text-xs text-muted-foreground px-2 py-1 rounded-lg bg-secondary/50 font-semibold">
              {language}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] rounded-b-2xl overflow-hidden border-t-2 border-primary/20">
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-[#1a1f3a] to-[#0a0e27] border-b-2 border-primary/10 flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground font-mono font-semibold">{language}</div>
          </div>
          <div className="pt-12 pb-5 px-5 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code className="text-[#e2e8f0]">
                {lines.map((line, index) => {
                  const lineNumber = index + 1
                  const isHighlighted = highlightedLine === lineNumber
                  return (
                    <div
                      key={index}
                      className={`flex items-start transition-all duration-300 ${isHighlighted
                          ? "bg-primary/20 border-l-4 border-primary rounded-r-lg -ml-5 pl-3 pr-5 shadow-lg shadow-primary/20"
                          : "hover:bg-primary/5"
                        }`}
                    >
                      <span className="text-[#64748b] text-xs mr-5 w-10 text-right select-none font-semibold">
                        {lineNumber}
                      </span>
                      <span className="flex-1 text-[#e2e8f0]">{line || " "}</span>
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

