"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps {
    width?: number;
    height?: number;
    className?: string;
    squares?: [number, number][];
}

export function InteractiveGridPattern({
    width = 40,
    height = 40,
    className,
    squares,
    ...props
}: InteractiveGridPatternProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top } = containerRef.current.getBoundingClientRect();
            mouseX.set(event.clientX - left);
            mouseY.set(event.clientY - top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full overflow-hidden [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                className,
            )}
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`, // Fallback or different pattern if needed, but let's use the dots
            }}
            {...props}
        >
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px'
            }} />
            <Pattern mouseX={mouseX} mouseY={mouseY} />
        </div>
    );
}

function Pattern({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <motion.div
                className="absolute inset-0 opacity-100"
                style={{
                    ...style,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                }}
            />
        </div>
    );
}
