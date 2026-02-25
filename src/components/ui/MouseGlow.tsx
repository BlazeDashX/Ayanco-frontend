"use client";

import { useEffect, useRef } from "react";

/**
 * MouseGlow — Global ambient cursor glow effect.
 * Renders a fixed, golden radial gradient that smoothly follows the mouse
 * using requestAnimationFrame for 60fps tracking.
 * Subtle on light pages, vivid on dark (#09090B) pages.
 */
export default function MouseGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            if (glowRef.current) {
                const { x, y } = posRef.current;
                glowRef.current.style.transform = `translate(${x - 400}px, ${y - 400}px)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-9999 overflow-hidden"
        >
            <div
                ref={glowRef}
                className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(196,136,42,0.12) 0%, rgba(196,136,42,0.05) 35%, transparent 70%)",
                    transform: "translate(-9999px, -9999px)",
                }}
            />
        </div>
    );
}
