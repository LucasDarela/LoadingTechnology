"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { uiStore } from "@/lib/experience";

// Mesma curva do token --ease-out em globals.css
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function useExperienceReady() {
  return useSyncExternalStore(uiStore.subscribe, () => uiStore.get().ready, () => false);
}

type LinesProps = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** "ready" espera o preloader sair; "view" revela ao entrar na tela */
  trigger?: "view" | "ready";
};

/**
 * Título revelado linha a linha: cada linha sobe de dentro de uma máscara
 * inclinando em 3D, como se virasse uma página em direção ao leitor.
 */
export function Lines({ lines, as = "h2", className, delay = 0, trigger = "view" }: LinesProps) {
  const reduce = useReducedMotion();
  const ready = useExperienceReady();
  const Tag = motion[as];

  const line: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(110%) rotateX(-50deg)" },
    show: (i: number) => ({
      opacity: 1,
      transform: reduce ? undefined : "translateY(0%) rotateX(0deg)",
      transition: { duration: reduce ? 0.4 : 1.1, ease: EASE_OUT, delay: delay + i * 0.08 },
    }),
  };

  const viewProps =
    trigger === "ready"
      ? { animate: ready ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once: false, amount: 0.4 } };

  return (
    <Tag className={cn("[perspective:1200px]", className)} initial="hidden" {...viewProps}>
      {lines.map((content, i) => (
        // A margem negativa com padding evita que descendentes (g, p, ç) sejam cortados pela máscara.
        <span key={i} className="block overflow-hidden -mx-[0.06em] -mt-[0.2em] -mb-[0.3em] px-[0.06em] pt-[0.2em] pb-[0.3em]">
          <motion.span className="block origin-bottom will-change-transform" custom={i} variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "view" | "ready";
  as?: "div" | "p" | "ul" | "li" | "span";
};

export function Fade({ children, className, delay = 0, trigger = "view", as = "div" }: FadeProps) {
  const reduce = useReducedMotion();
  const ready = useExperienceReady();
  const Tag = motion[as];
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(24px)" };
  const shown = {
    opacity: 1,
    transform: reduce ? undefined : "translateY(0px)",
    transition: { duration: reduce ? 0.4 : 0.9, ease: EASE_OUT, delay },
  };

  if (trigger === "ready") {
    return (
      <Tag className={className} initial={hidden} animate={ready ? shown : hidden}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag className={className} initial={hidden} whileInView={shown} viewport={{ once: true, amount: 0.3 }}>
      {children}
    </Tag>
  );
}

type ChapterProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** o último capítulo não some no fim da página */
  fadeOut?: boolean;
};

/**
 * Seção-capítulo: o conteúdo acende ao entrar e apaga ao sair, ligado
 * diretamente ao scroll (portanto interrompível e reversível).
 */
export function Chapter({ id, children, className, fadeOut = true }: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 0.55", "end start"] });
  const opacity = useTransform(() => {
    if (reduce) return 1;
    const inOp = Math.min(enter.get() * 1.25, 1);
    const outOp = fadeOut ? 1 - exit.get() : 1;
    return Math.max(Math.min(inOp, outOp), 0);
  });
  const transform = useTransform(() =>
    reduce ? "none" : `translateY(${(1 - enter.get()) * 60 - (fadeOut ? exit.get() * 60 : 0)}px)`,
  );

  return (
    <section id={id} ref={ref} className={cn("relative", className)}>
      <motion.div style={{ opacity, transform }} className="will-change-[opacity,transform]">
        {children}
      </motion.div>
    </section>
  );
}

/** Kicker "01 · Stack" no topo de cada capítulo */
export function Kicker({ index, children, trigger }: { index?: string; children: ReactNode; trigger?: "view" | "ready" }) {
  return (
    <Fade trigger={trigger} className="caption text-muted flex items-center gap-3">
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-muted/40" />}
      <span>{children}</span>
    </Fade>
  );
}
