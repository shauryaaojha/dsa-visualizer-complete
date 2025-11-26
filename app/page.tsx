import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { TechStack } from "@/components/landing/tech-stack";
import { CTA } from "@/components/landing/cta";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-8 px-6 md:px-12 max-w-[1400px] mx-auto w-full pt-20">
      <InteractiveGridPattern className="absolute inset-0 -z-10 opacity-50" />
      <Hero />
      <Features />
      <TechStack />
      <CTA />
    </div>
  );
}
