"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { experience, uiStore } from "@/lib/experience";
import { cn } from "@/lib/utils";

const MIN_DURATION = 1300;
const MAX_WAIT = 4000;

export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 300 : MIN_DURATION;

    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));

    const start = performance.now();
    let value = 0;
    let raf = 0;

    // O contador avança com o tempo, mas segura em 90% até a cena 3D e as
    // fontes estarem prontas, para não revelar uma página pela metade.
    const loop = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const loaded = (experience.sceneReady && fontsReady) || elapsed > MAX_WAIT;
      value = Math.max(value, Math.min(eased, loaded ? 1 : 0.9));

      if (counterRef.current) counterRef.current.textContent = `${String(Math.round(value * 100)).padStart(2, "0")} %`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value})`;

      if (value >= 1) {
        uiStore.set({ ready: true });
        setPhase("leaving");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden={phase === "leaving"}
      role="status"
      aria-label="Carregando"
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && phase === "leaving") setPhase("done");
      }}
      className={cn(
        "preloader fixed inset-0 z-[60] bg-background [clip-path:inset(0_0_0_0)]",
        reduce
          ? "transition-opacity duration-300 ease-out"
          : "transition-[clip-path] duration-[1000ms] ease-[var(--ease-in-out)] delay-150",
        phase === "leaving" && (reduce ? "opacity-0" : "[clip-path:inset(0_0_100%_0)]"),
      )}
    >
      <div
        ref={barRef}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-accent shadow-[0_0_12px_var(--color-accent)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <Logo className="h-14 w-14 text-neon-hot" />
        <span className="font-display text-sm font-semibold tracking-wide text-ice">Loading Technology</span>
      </div>
      <span
        ref={counterRef}
        className="absolute bottom-6 left-5 font-mono text-5xl font-bold tabular-nums leading-none text-ice md:bottom-10 md:left-10 md:text-7xl"
      >
        00 %
      </span>
      <span className="caption absolute bottom-7 right-5 text-muted md:bottom-11 md:right-10">Carregando experiência</span>
    </div>
  );
}
