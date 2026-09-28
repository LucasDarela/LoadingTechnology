"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { chapters } from "@/lib/chapters";
import { experience, uiStore } from "@/lib/experience";

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    experience.reducedMotion = reduce;

    let tops: number[] = [];
    let heights: number[] = [];
    const measure = () => {
      tops = [];
      heights = [];
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        const rect = el?.getBoundingClientRect();
        tops.push(rect ? rect.top + window.scrollY : 0);
        heights.push(rect ? rect.height : 1);
      }
    };

    // Converte a posição do scroll em um índice contínuo de capítulo.
    // A forma só começa a se transformar na parte final de cada seção,
    // assim ela fica estável enquanto o texto está sendo lido.
    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      experience.progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

      const mid = y + vh * 0.5;
      let i = 0;
      while (i < tops.length - 1 && mid >= tops[i + 1]) i++;
      const frac = (mid - tops[i]) / heights[i];
      const last = i === chapters.length - 1;
      experience.morph = last ? i : i + smoothstep(0.62, 1, frac);
      uiStore.set({ chapter: i });
    };

    measure();
    update();

    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);

    const onPointer = (e: PointerEvent) => {
      experience.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      experience.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let lenis: Lenis | null = null;
    let unsubscribe: (() => void) | undefined;

    if (reduce) {
      window.addEventListener("scroll", update, { passive: true });
    } else {
      lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: { duration: 1.6 } });
      experience.lenis = lenis;
      lenis.on("scroll", (l: Lenis) => {
        experience.velocity = l.velocity;
        update();
      });
      // Segura o scroll enquanto o preloader está na tela.
      if (!uiStore.get().ready) lenis.stop();
      unsubscribe = uiStore.subscribe(() => {
        if (uiStore.get().ready) lenis?.start();
      });
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", update);
      unsubscribe?.();
      lenis?.destroy();
      experience.lenis = null;
    };
  }, []);

  return null;
}
