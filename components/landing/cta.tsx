import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";

export const CTA = () => (
  <section className="w-full py-2 lg:py-3 flex-none">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="relative overflow-hidden rounded-lg liquid-glass p-3 sm:p-4 border border-primary/30 w-full min-h-0 h-auto">
        <div className="absolute inset-0 animated-gradient opacity-10"></div>
        <div className="absolute inset-0 bg-grid-primary/5 bg-[size:40px] [mask-image:radial-gradient(white,transparent_85%)]" />

        <div className="relative flex flex-col items-center text-center gap-2 z-10">
          <h2 className="text-xl md:text-3xl font-black tracking-tight gradient-text">
            Ready to Start Learning?
          </h2>
          <p className="text-xs md:text-sm text-foreground/80 max-w-md font-medium leading-tight">
            Explore data structures through interactive visualizations and hands-on examples.
            Master algorithms step-by-step with real-time code execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/visualizer">
              <RainbowButton className="gap-1 rounded-md px-4 py-2 text-xs font-bold h-8">
                Start Exploring <MoveRight className="w-3 h-3 ml-1" />
              </RainbowButton>
            </Link>
            <Link href="/curriculum">
              <Button className="gap-1 rounded-md px-4 py-2 text-xs font-bold h-8 bg-background/50 backdrop-blur-sm hover:bg-background/80 text-foreground" variant="outline">
                View Curriculum
              </Button>
            </Link>
          </div>

          <div className="mt-2 text-muted-foreground text-[9px]">
            Built with ♥ for DSA learners • by{" "}
            <Link
              href="https://github.com/shauryaaojha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @shauryaaojha
            </Link>
            {" & "}
            <Link
              href="https://github.com/ranjan-arnav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @ranjan-arnav
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);