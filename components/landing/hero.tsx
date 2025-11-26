"use client";

import { MoveRight, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export const Hero = () => (
  <div className="relative w-full py-4 lg:py-8 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
    </div>

    <div className="container mx-auto relative">
      <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
        <div className="flex gap-6 flex-col">
          <div className="flex gap-2 flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
              <Play className="h-3 w-3" />
              Interactive Learning Platform
            </div>
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tight text-left font-black gradient-text">
              Master Data Structures Visually
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-lg text-left">
              Learn algorithms and data structures through interactive step-by-step visualizations.
              See code, understand execution, and track metrics in real-time.
            </p>
          </div>
          <div className="flex flex-row gap-3 flex-wrap">
            <Link href="/visualizer">
              <RainbowButton className="rounded-full px-6">
                Explore Visualizers <MoveRight className="ml-2 h-4 w-4" />
              </RainbowButton>
            </Link>
            <Link href="/curriculum">
              <Button className="gap-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 text-foreground" variant="outline">
                <BookOpen className="h-4 w-4" />
                View Curriculum
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden liquid-glass group">
          <div className="absolute inset-0 animated-gradient opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.2),transparent_70%)]"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center space-y-6 w-full relative z-10">
              <div className="relative inline-block">
                <div className="text-8xl font-black gradient-text animate-pulse">
                  N
                </div>
                <div className="absolute -top-3 -right-3 w-5 h-5 bg-primary rounded-full animate-ping shadow-lg shadow-primary/50"></div>
                <div className="absolute -top-3 -right-3 w-5 h-5 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-foreground">Interactive Visualizations</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Code • Controls • Metrics • Step-by-Step
                </div>
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <div className="px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-xs font-semibold backdrop-blur-sm">20+ Visualizers</div>
                <div className="px-4 py-2 rounded-xl bg-accent/20 border border-accent/30 text-xs font-semibold backdrop-blur-sm">7 Modules</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);