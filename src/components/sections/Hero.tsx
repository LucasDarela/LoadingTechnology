"use client";

import { ArrowRight } from "lucide-react";
import { Chapter, Fade, Kicker, Lines } from "@/components/experience/Reveal";
import { scrollToChapter } from "@/lib/experience";

export function Hero() {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToChapter(id);
  };

  return (
    <Chapter id="inicio">
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col items-center justify-center px-5 py-32 text-center md:px-10">
        <div className="text-halo text-halo-soft flex flex-col items-center gap-6 md:gap-8">
          <Kicker trigger="ready">Inovação e Engenharia de Software</Kicker>

          <Lines
            as="h1"
            trigger="ready"
            delay={0.1}
            className="text-[clamp(1.95rem,min(7vw,12vh),7.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-ice"
            lines={[
              "Transformando ideias",
              "em tecnologia de",
              <span key="impacto" className="text-neon-hot">
                alto impacto.
              </span>,
            ]}
          />

          <Fade trigger="ready" delay={0.45} as="p" className="max-w-[46ch] text-lg leading-relaxed text-ice/80 md:text-xl">
            Na Loading Technology, desenvolvemos soluções de software escaláveis e modernas que impulsionam o seu
            negócio para o futuro.
          </Fade>

          <Fade trigger="ready" delay={0.6} className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contato"
              onClick={go("contato")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ice px-7 py-4 font-medium text-background transition-[transform,background-color] duration-150 ease-out hover:bg-white active:scale-[0.97]"
            >
              Inicie seu projeto
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
            </a>
            <a
              href="#cases"
              onClick={go("cases")}
              className="inline-flex items-center justify-center rounded-full border border-ice/20 px-7 py-4 font-medium text-ice transition-[transform,background-color,border-color] duration-150 ease-out hover:border-ice/40 hover:bg-ice/5 active:scale-[0.97]"
            >
              Conheça nossos cases
            </a>
          </Fade>
        </div>
      </div>
    </Chapter>
  );
}
