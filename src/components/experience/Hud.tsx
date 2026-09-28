"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { chapters } from "@/lib/chapters";
import { experience, scrollToChapter, uiStore } from "@/lib/experience";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const nav = [
  { id: "servicos", label: "Serviços" },
  { id: "cases", label: "Cases" },
  { id: "contato", label: "Contato" },
];

export function Hud() {
  const { chapter, ready } = useSyncExternalStore(uiStore.subscribe, uiStore.get, uiStore.getServer);
  const [scrolled, setScrolled] = useState(false);
  const percentRef = useRef<HTMLSpanElement>(null);

  // O percentual muda a cada frame; escrevemos direto no DOM para não re-renderizar.
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const loop = () => {
      const p = Math.round(experience.progress * 100);
      if (p !== last) {
        last = p;
        if (percentRef.current) percentRef.current.textContent = `${String(p).padStart(3, "0")} %`;
        setScrolled(p > 0);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hint = !scrolled
    ? "Role para explorar"
    : `${String(chapter).padStart(2, "0")} · ${chapters[chapter].label}`;

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToChapter(id);
  };

  return (
    <div
      className={cn(
        "caption pointer-events-none fixed inset-0 z-40 text-ice transition-opacity duration-700 ease-[var(--ease-out)]",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      {/* topo */}
      <div className="absolute inset-x-0 top-0 grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-5 md:px-10 md:pt-8">
        <div className="relative hidden h-[1.4em] overflow-hidden sm:block">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={hint}
              className="absolute left-0 top-0 whitespace-nowrap"
              initial={{ opacity: 0, transform: "translateY(100%)" }}
              animate={{ opacity: 1, transform: "translateY(0%)" }}
              exit={{ opacity: 0, transform: "translateY(-100%)" }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {hint}
            </motion.span>
          </AnimatePresence>
        </div>

        <a
          href="#inicio"
          onClick={go("inicio")}
          className="pointer-events-auto flex items-center gap-2 font-display text-[13px] font-semibold normal-case tracking-[0.02em] text-ice"
        >
          <Logo className="h-4 w-4 text-neon-hot" />
          <span className="hidden sm:inline">Loading Technology</span>
        </a>

        <nav className="flex justify-end gap-6">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={cn(
                "pointer-events-auto text-muted transition-colors duration-200 hover:text-ice",
                item.id !== "contato" && "hidden md:inline",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* régua de capítulos */}
      <nav aria-label="Capítulos" className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:right-10 md:flex">
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={go(c.id)}
            aria-label={c.label}
            aria-current={i === chapter ? "step" : undefined}
            className="group pointer-events-auto flex items-center gap-3 py-1.5"
          >
            <span className="text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">{c.label}</span>
            <span
              className={cn(
                "block h-px w-10 origin-right transition-[transform,background-color] duration-500 ease-[var(--ease-out)]",
                i === chapter ? "scale-x-100 bg-accent" : "scale-x-[0.35] bg-muted/50 group-hover:bg-ice",
              )}
            />
          </a>
        ))}
      </nav>

      {/* rodapé */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-5 md:px-10 md:pb-8">
        <span className="hidden text-muted md:inline">Atendimento 100% remoto</span>
        <span ref={percentRef} className="ml-auto tabular-nums text-muted">
          000 %
        </span>
      </div>
    </div>
  );
}
